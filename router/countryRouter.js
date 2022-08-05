
const express = require('express'); // sunucu oluşturmak için eklendi
const router = express.Router(); // bu dosyada tanımlanan istekerin main dosyası olan app.js tarafından tanınması için eklenir.

const { ObjectId } = require('mongodb'); // Yeni eklenecek veriler için id tanımlası yapan ObjectId sınıfı eklendi. 

const mongoOpt = require('./mongoOperations'); // mongodb işlemlerini yapan modül eklendi

// destructuring yapısı kullanılarak asenkron olarak tanımlanan tüm mongodb fonksiyonları ilgili değişkenlere atandı
const { mongoBaglanti, mongoFind, mongoFindOne, mongoUpdate, mongoInsert, mongoDelete, mongoSortByDesc, mongoSortByAsc } = mongoOpt;

/* 
    localhost:3000/country adresine yapılan get istekleri aşağıdaki yapıyı çalıştırır. Bu istek sonucunda
    country veritabanının info collectionu içerisindeki veriler listelenir. 
    Not!!!
    Tüm fonksiyonlarda async - await yapısının kullanılma sebebi; işlemlerin ne kadar vakit alacağının tahmin edilemez olmasıdır.
    Bu sebeple async fonksiyonları tamamlanıp işlem bittikten sonra bir sonraki adıma geçer böylelikle undefined gibi hatalar
    engellenir. Bu fonksiyonlar kendi kendini çağıracak şekide tanımlanmıştır. Bu yüzden ekstra olarak bir call işlemi yapılmasına
    gerek yoktur.
*/
router.get('/', (req, res) => {
    (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. get isteği yapılıdğında bu yapı otomatik olarak tetiklenir
        const collec = await mongoBaglanti(); // verileri getirmek için ilk önce mongodb bağlağlantısı yapılır
        const foundData = await mongoFind(collec); // bağlantıdan sonra mongoFind() fonksiyonu ile tüm veriler (countryName, capital, population) getirilir
        console.log(`${foundData.length} ülkenin bilgileri listeleniyor...`); // bulunan ülke sayısı konsol ekranına yazılır
        res.send(foundData); // tarayıcıda tüm sonuçlar görülür
    })();
});

/* 
     localhost:3000/country/azalan adresine yapılan get istekleri aşağıdaki yapıyı tetikler. İstek sonuncunda veritabanında
     population alanına karşılık gelen değerler baz alınarak ülkeler nüfus sayısı çok olandan az olana doğru sıralanır
*/
router.get('/azalan', (req, res) => {
    (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. get isteği yapılıdğında bu yapı otomatik olarak tetiklenir
        const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır
        const sortedResult = await mongoSortByDesc(collec); // veriler population bilgisine göre çoktan aza doğru sıralanır
        console.log(`ülkeler popülasyon bilgisine göre azalan sırada getiriliyor...`);
        res.send(sortedResult); // tarayıcıda tüm sonuçlar görülür
    })();

})

/* 
     localhost:3000/country/azalan adresine yapılan get istekleri aşağıdaki yapıyı tetikler. İstek sonuncunda veritabanında
     population alanına karşılık gelen değerler baz alınarak ülkeler nüfus sayısı az olandan çok olana doğru sıralanır
*/
router.get('/artan', (req, res) => {
    (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. get isteği yapılıdğında bu yapı otomatik olarak tetiklenir
        const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır
        const sortedResult = await mongoSortByAsc(collec); // veriler population bilgisine göre azdan çoğa doğru sıralanır
        console.log(`ülkeler popülasyon bilgisine göre artan sırada getiriliyor...`);
        res.send(sortedResult); // tarayıcıda tüm sonuçlar görülür
    })();

})

/* 
    localhost:3000/country/{countryName} adresine yapılan get istekleri aşağıdaki yapıyı tetikler. countryName alanına, bilgisini
    görüntülemek istenilen ülke ismi yazılır. Eğer aranılan ülke ismi veritabanında bulunuyorsa { countryName, capital ve population } 
    bilgileri görüntülenir. Ülke bilgilerini görüntülemek için örnek bir get isteği aşağıdaki gibi yapılır.
    localhost:3000/country/turkey
*/
router.get('/:name', (req, res) => {
    const myCountryName = req.params.name; // istek yapılan ülke ismi bilgisi bu değişkende tutulur.
    const findCountryName = myCountryName.charAt(0).toUpperCase() + myCountryName.slice(1); // kullanıcının küçük harflerle girdiği ülke bilgisinin ilk karakteri büyük harfe dönüştürülür
    (async () => {                                                                          // çünkü veritabanında ülke isimlerinin ilk karakteri büyük harfden oluşur. 
        const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır. 
        const foundResult = await mongoFind(collec); // veritabanında info şemasında bulunan tüm veriler foundResult değişkeninde tutulur
        const result = foundResult.find(value => value.countryName === findCountryName); // array ler için özel olarak tanımlanmış find metodunu kullanarak aranılan ifade var mı diye kontrol edilir
        if (result) { // aranılan ifade db de varsa result değişkeni true olur ve if çalışır
            const foundResult2 = await mongoFindOne(collec, findCountryName); // bulunan değeri kullanıcıya iletmek için mongoFindOne fonksiyonu kullanılır 
            console.log(`${findCountryName} ülke bilgisi görüntüleniyor...`);
            return res.send(foundResult2); // tarayıcıda tüm sonuçlar görülür. return sayesinde kodların devamı engellenir ve olası hataların önüne geçilir
        }
        console.log(`${findCountryName} ülkesi bulunamadı!`); // aranan ülke bilgisi veritabanında yoksa bu alan çalışır
        res.status(404).send(`${findCountryName} ülkesi bulunamadı!`);
    })();

})

/* 
    localhost:3000/country adresine yapılan post istekleri aşağıdaki yapıyı tetikler. post isteği ile kullanıcı
    veritabanına yeni değer eklemesi yapar. 
*/
router.post('/', (req, res) => {
    (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. post isteği yapılıdğında bu yapı otomatik olarak tetiklenir
        const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır
            if (req.body[0]) { // kullanıcı birden fazla değer (array şeklinde) girdiyse uyarı mesajı verir. Bir post işleminde sadece bir bilgi eklemesi yapılabilir.
                console.log("Lütfen tek değer girin")
                res.status(404).send("Lütfen tek değer girin")
            } else { // Kullanıcı obje türünde tek değer girerse else çalışır
                try { // try yapısı sayesinde oluşabilecek hatalar programın çalışmasını engellemez.
                    const reqB = req.body; // kısaltma yapmak için
                    const newCountry = { // kullanıcının post ettiği countryName, capital ve population bilgisi newCountry değişkeninde tutulur
                        _id: ObjectId(), // mongodb nin ObjectId() sınıfı kullanılarak eşsiz id değeri oluşturulur
                        countryName: reqB.countryName.charAt(0).toUpperCase() + reqB.countryName.slice(1), // db de verilerin düzenli olması için ülke ismi bilgisinin ilk harfi büyük olacak şekilde kaydedilir
                        capital: reqB.capital, // başkent bilgisi tutulur
                        population: reqB.population, // nüfus bilgisi alınır
                    }
                    const sonuc = await mongoInsert(collec, newCountry); // alınan veriler validation (doğrulama) işlemlerinden geçer. Bir hata tespit edilmezse veri db ye kaydedilir 

                    if (!sonuc.errInfo) { // veri eklenirken bir hata oluşmazsa burası çalışır
                        const foundResult = await mongoFind(collec); // Yeni eklenen veri ile birlikte tüm db verileri listelenmesi için foundResult değişkenine kaydedilir.
                        console.log(`${reqB.countryName} ülkesi eklendi.`);
                        res.send(foundResult) // tüm sonuçlar tarayıda görüntülenir
                    } else { // eğer veri eklenme sırasında bilgi eksikliği veya herhangi bir hatadan kaynaklı bir durum oluşursa else çalışır
                        let err = sonuc.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0] // veri eklenirken validation işlemlerinde bir hata tespit edilirse bu hata err değişkenine kaydedilir
                        console.log(`\n${reqB.countryName} ülkesi eklenemedi.\n`);
                        console.log(`Eksik veya hatalı bilgi girilmiştir. Hata mesajını okuyunuz.\n`);
                        console.log(err); // hata sebebi konsol ekranında görüntülenir
                        res.status(404).send(err); // hata sebebi tarayıcıda görüntülenir.
                    }
                } catch (err) { // try bloğunda yapılan işlemlerde bir sorun tespit edilirse catch bloğu çalışır
                    console.log("Eksik veya hatalı değer girilmiştir");
                    res.status(404).send("Eksik veya hatalı değer girilmiştir"); // 404 bulunamadı bilgisi mesaj olarak gösterilir (f12 console ekranına bakınız)
                }
            }
    })();
});

/* 
    localhost:3000/country adresine yapılan put istekleri aşağıdaki yapıyı tetikler. put isteği ile kullanıcı
    veritabanında bulunan bir değeri günceller. Bu istek parametre olarak güncellemek istediği ülke isimini alır. 
*/
router.put('/:name', (req, res) => {
    const myCountryName = req.params.name; // Güncellenecek ülke ismi burada tutulur
    const findCountryName = myCountryName.charAt(0).toUpperCase() + myCountryName.slice(1); // DB de ülke isimlerinin ilk harfi büyük olduğundan arama yaparaken hata 
                                // ile karşılaşmamak için parametre olarak verilen ülke isminin ilk karakteri büyük harf yapılır
        if (req.body[0]) { // girilen veri obje türünde tek bir veri olması gerektiğinden kontrolü yapılır
            console.log("Lütfen tek değer girin")
            res.status(404).send("Lütfen tek değer girin")
        } else { // eğer obje türünde tek bir veri girilirse else bloğu çalışır
            (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. put isteği yapılıdğında bu yapı otomatik olarak tetiklenir
                const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır
                const foundResult = await mongoFind(collec); // veritabanındaki tüm veriler foundResult değişkenine kaydedilir
                const bulunan = foundResult.find(value => value.countryName === findCountryName); // güncellenecek ülke ismi find metodu ile aranır
                try {
                    if (bulunan) { // aranılan ifade veritabanında varsa if bloğu çalışır
                        const reqB = req.body; // kısaltma yapmak için kullanılır
                        const newCountry = { // post edilen veriler newCountry değişkeninde tutulur 
                            $set: { // mongodb nin bu verileri db ye kaydetmesi için özel anahtar olan $set ifadesi kullanılır
                                countryName: reqB.countryName.charAt(0).toUpperCase() + reqB.countryName.slice(1),
                                capital: reqB.capital,
                                population: reqB.population,
                            }
                        }
                        const sonuc = await mongoUpdate(collec, findCountryName, newCountry); // güncelleme işlemi yapmak için mongoUpdate fonksiyonu çalışır
                        if (!sonuc.errInfo) { // güncelleme işleminde bir sorun ortaya çıkmazsa if bloğu çalışır
                            console.log(`${findCountryName} ülkesi ${reqB.countryName} ülkesi ile güncellendi`);
                            return res.send(await mongoFind(collec)); // if bloğu çalışırsa kodların devamını engellemek için return ifadesi kullanılır
                        }
                        // veri güncellenirken bir hata oluştuysa burası çalışır
                        let err = sonuc.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].details[0] // hata kaynağını kullanıcıya göstermek için err değişkenine kaydedilir.
                        console.log(`\n${findCountryName} ülkesi güncellenemedi\n`);
                        console.log("Hatalı veya eksik bilgi girilmiştir. Hata mesajını kontrol ediniz.\n");
                        console.log(err);
                        res.send(err) // hata bilgisi tarayıcıda görüntülenir
    
                    } else { // parametre olarak gönderilen ülke ismi veritabanında bulunmuyorsa else bloğu çalışır
                        console.log(`${findCountryName} ülkesi bulunamadı!`);
                        res.status(404).send(`${findCountryName} ülkesi bulunamadı!`);
                    }
                } catch (err) { // try bloğu çalışırken olaşabilecek herhangi bir hatadan kaynaklı programın durmasını engellemek için hata burada yakalanır.
                    console.log("Hatalı değer girilmiştir");
                    res.status(404).send("Hatalı değer girilmiştir");
                }
            })();
        };
});


/* 
    localhost:3000/country adresine yapılan delete istekleri aşağıdaki yapıyı tetikler. delete isteği ile kullanıcı
    veritabanında bulunan bir değeri siler. Bu istek parametre olarak silmek istediği ülke isimini alır. 
*/
router.delete('/:name', (req, res) => {
    const myCountryName = req.params.name; // parametre olarak gönderilen ülke bilgisi myCountryName değişkenine kaydedilir
    const findCountryName = myCountryName.charAt(0).toUpperCase() + myCountryName.slice(1); // DB de ülke isimlerinin ilk harfi büyük olduğundan arama yaparaken hata 
                        // ile karşılaşmamak için parametre olarak verilen ülke isminin ilk karakteri büyük harf yapılır
    
    (async () => { // buradaki asenkron fonksiyon kendi kendini çağıracak şekilde tanımlandı. delete isteği yapılıdğında bu yapı otomatik olarak tetiklenir
        const collec = await mongoBaglanti(); // mongodb bağlantısı yapılır
        const foundResult = await mongoFind(collec); // veritabanındaki tüm veriler foundResult değişkenine kaydedilir 
        const bulunan = foundResult.find(value => value.countryName === findCountryName); // silinecek ülke ismi find metodu ile aranır

        if (bulunan) { // parametre olarak gönderilen ülke ismi veritabanında bulunduysa if bloğu çalışır
            console.log(`${findCountryName} ülkesi silindi`);
            await mongoDelete(collec, findCountryName); // mongoDelete fonksiyonu ile veri database den silinir.
            const sonuc = await mongoFind(collec);
            return res.send(sonuc) // silinme işleminden sonra güncellenen veritabanı bilgisi tarayıcıda görüntülenir.
        }
        // silinecek ülke ismi veritabanında bulunamadıysa burası çalışır
        console.log(`${findCountryName} ülkesi listede bulunamadı!`);
        res.status(404).send(`${findCountryName} ülkesi listede bulunamadı!`);
    })();

});

module.exports = router; // router olarak tanımlanan rotalar app.js dosyası tarafından görülmesi için dışarıya export edilir.