
const fetch = require('node-fetch'); // ücretsiz api kaynağından veri getirmek için node-fetch modülü dahil edildi.

const mongoOpt = require('../router/mongoOperations'); // mongodb işlemlerini yapan modül eklendi
const { mongoInsertMany } = mongoOpt; // mongodb insert fonksiyonu bu modüle dahil edildi.

const validation = require('./validation'); // validation işlemlerinin yapıldığı modül eklendi.

/* 
    Program ilk kez çalışıtırıldığında, veritabanı bulunmuyorsa aşağıdaki fonksiyon tetiklenir fetch ile veriler db ye eklenir.
*/
async function firstDataSave(myCollection) {
    let myCountry = [] // fetch ile alınan veriler myCountry isimli array de tutulur.
    fetch('https://restcountries.com/v3.1/all') // ücretsiz api kaynağı sağlayan restcountries.com websitesine fetch ile get isteği yapılır. 
        .then(sonuc => {
            sonuc.json() // fetch sonucu dönen verileri okunabilir hala getirmek için json veri türüne dönüştürür.
                .then(data => {
                    data.forEach(veri => { // gelen her data verisi içerisinde yer alan ülke adı, başkent ve nüfus bilgilerini sırayla countryName, capital ve population değişkenlerine kaydeder
                        let countryName = veri.name.common
                        let population = veri.population
                        let capital;
                        try {
                            capital = veri.capital[0] // capital verisi obje türünde gelir verinin capital bilgisini elde etmek için parse edilir 
                        } catch {
                            capital = null // eğer bir hata oluşursa null olarak belirlenir.
                        }
                        let newValue = { countryName, capital, population }; // countryName, population, capital verileri newValue objesinde tutulur.
                        myCountry.push(newValue); // veriler myCountry dizisine eklenir
                    })
                    validation(); // doğrulama işlemleri için valitaion() fonksiyonu tetiklenir. 

                    // Yukarıdaki verilerin eklenmesi zaman alır. Bu yüzden hata mesajı almamak için buraya 250 milisaniye bekleme süresi verildi..
                    setTimeout(() => {
                        (async () => { await mongoInsertMany(myCollection, myCountry) })() // veriler mongodb ye kaydedilir.
                    },250);  
                })
        }).catch(err => { // fetch isteğinde herhangi bir sorun oluşursa catch bloğu çalışır
            console.log("Hata oluştu, fetch işlemi gerçekleşemedi, veri alınamadı");
            return err
        })
};

module.exports = firstDataSave; // onlyOne modülü fetch işlemine gerek duyar bu sebeple dışarıya export edilir.


