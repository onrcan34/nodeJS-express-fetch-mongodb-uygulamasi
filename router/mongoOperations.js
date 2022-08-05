
const { MongoClient } = require('mongodb'); // mongodb paketinin MongoClient sınıfını dahil edildi

const dbInfo = require('../db/dbInfo'); // database bilgilerinin yazılı olduğu modül dahil edildi.
const { dbURL, dbName, collectionName } = dbInfo; // db bilgileri destructuring yapısı ile değişkenlere atandı 

/* 
    MongoDB nin veritabanına bağlantı yaparken MongoClient sınıfı kullanılır.
    async (asenkron) fonksiyonları kullanma sebebi; yapılan işlemler (database bağlantısı, veri eklemek, veri getirmek)
    biraz zaman alabilir. Uygulamamız verileri eksik getirmesini veya bir hata ile karşılaşmasını engellemek için 
    bu yapı kullanıldı
*/
async function mongoBaglanti() {
    return MongoClient.connect(dbURL) // mongodb ye bağlantı için mongodb'nin url adresi verildi. Bu yapı bize promise döndürür. Bu yüzden then ve catch ile sonuçları ele alırız
        .then(sonuc => { // eğer bir sonuç dönerse then çalışır
            const db = sonuc.db(dbName); // bağlantı sağlanacak db ismi tanımlandı
            const myCollection = db.collection(collectionName) // Bir collection dökümanı oluşturuldu
            return myCollection // find, insert, delete, update gibi işlemler için collection dökümanı return edildi.
        })
        .catch(err => { // eğer bir sonuç dönmezse then çalışmaz, catch yapısı çalışır
            return err
        });
};

/* 
    mongodb üzerinde bulunan işlem yapılacak database in sahip olduğu tüm verileri listeler
    myCollec isminde parametre alır. Bu parametre mongodb ye ilk bağlantı ( mongoBaglanti() ) yapıldıktan sonra dönen
    collection dökümanıdır. 
*/
async function mongoFind(myCollec) {
    return myCollec.find().toArray() // find() metodu sonuç olarak cursor döner. Bunu ele almak için (okunabilir bir veri haline getirmek) toArray() metodu ile birlikte kullanıldı
        .then(sonuc => {
            return sonuc
        })
        .catch(err => {
            return err
        })
}

/* 
    mongodb üzerinde bulunan işlem yapılacak database de parametre olarak verdiğimiz değeri veritabanında sorgular.
    myCollec ve cName isminde iki parametre alır. cName parametesi kullanıcının veritabanında aramak istediği ülke ismidir.
*/
async function mongoFindOne(myCollec, cName) {
    return myCollec.findOne({ countryName: cName }) // findOne() metodu ile veritabanında ülke isimlerinin bulunduğu alan olan "countryName" isimli alanda parametre olarak verilen ülke ismi varmı kontrol eder
        .then(sonuc => { // findOne() metodundan bir sonuç dönerse then yapısı çalışır ve sonucu return eder
            return sonuc
        })
        .catch(err => {
            return err
        });
};

/* 
    mongodb üzerinde bulunan işlem yapılacak database de parametre olarak verdiğimiz değeri veritabanında sorgular.
    mongoUpdate() fonksiyonu, parametre olarak verilen ülke ismini bulur ve bu ülke ye karşılık gelen değerler üzerinde güncelleme işlemleri yapar 
    myCollec, cName ve newInfo  isminde üç parametre alır. cName parametesi kullanıcının veritabanında aramak istediği ülke ismidir.
    newInfo ise, kullanıcının database post edeceği verilerin tutulduğu bir obje dir.
*/
async function mongoUpdate(myCollec, cName, newInfo) {
    return myCollec.updateOne({ countryName: cName }, newInfo) // Bu yapı sonuç olarak promise döner. then - catch ile sonuçlar ele alınır ve return edilir
        .then(sonuc => {
            return sonuc
        })
        .catch(err => {
            return err
        });
};

/* 
    mongodb de işlem yapılacak database üzerine yeni veri eklemesi yapar.
    Bu fonksiyon myCollec ve newCountry isminde 2 parametre alır. newCountry, eklenecek verilerin tutulduğu bir objedir.
*/
async function mongoInsert(myCollec, newCountry) {
    return myCollec.insertOne(newCountry) // Bu yapı sonuç olarak promise döner. then - catch ile sonuçlar ele alınır ve return edilir
        .then(sonuc => {
            return sonuc
        })
        .catch(err => {
            return err
        });
};

/* 
    mongoInsertMany() fonksiyonu ile mongodb veritabanına birden fazla verinin tek seferde eklenmesi sağlanır.
    Bu fonksiyon sadece program ilk kez çalıştığında ve daha öncesinde country isimli database bulunmadığında çağrılır ve kullanılır
    Bu fonksiyon 2 parametre alır. "countries" isimli parametre fetch ile çekilen tüm veriyi saklamak için kullanılan bir array dir.
*/
async function mongoInsertMany(myCollec, countries) {
    return myCollec.insertMany(countries) // Bu yapı sonuç olarak promise döner. then - catch ile sonuçlar ele alınır ve return edilir 
        .then(sonuc => {
            return sonuc
        })
        .catch(err => {
            return err
        });
};

/* 
    mongoDelete() fonksiyonu ile mongodb veritabanında bulunan veriler içerisinden kullanıcının parametre olarak verdiği değeri
    sorgular. Bu değere karşılık gelen bir değer varsa siler. yoksa bir mesaj döndürür.
    İki parametre alır. cName parametresi kullanının silmek istediği ülke ismidir
*/
async function mongoDelete(myCollec, cName) {
    return myCollec.deleteOne({ countryName: cName }) // Bu yapı sonuç olarak promise döner. then - catch ile sonuçlar ele alınır ve return edilir 
        .then(sonuc => {
            return sonuc
        })
        .catch(err => {
            return err
        });
};

/* 
    veritabanında bulunan population verisine göre çoktan aza doğru sıralama yapar. Bu veritabanında ülkelerin nufüs bilgileri
    population alanına karşılık gelir.
*/
async function mongoSortByDesc(myCollec) {
    return myCollec.find().sort({ population: -1 }).toArray() // find ve sort metodları sonucu cursor ifadesi döner. Bu yapıyı ele almak için toArray() metodu kullanılır
        .then(sonuc => {                                      // population değerine +1 verilirse artan yönde (azdan çoğa) sıralama yapar
            return sonuc;
        })
        .catch(err => {
            console.log(err);
        })
}

/* 
    veritabanında bulunan population verisine göre azdan çoğa doğru sıralama yapar. Bu veritabanında ülkelerin nufüs bilgileri
    population alanına karşılık gelir.
*/
async function mongoSortByAsc(myCollec) {
    return myCollec.find().sort({ population: 1 }).toArray() // population değerine -1 verilirse artan yönde (azdan çoğa) sıralama yapar
        .then(sonuc => {
            return sonuc;
        })
        .catch(err => {
            console.log(err);
        })
}

// Yukarıda tanımlanan asenkron fonksiyonları, mongodb ile ilgili işlemleri (bağlantı, veri sil, ekle, güncelle) yaparken kullanmak için dışarıya export edilir.
module.exports = {
    mongoBaglanti,
    mongoFind,
    mongoFindOne,
    mongoUpdate,
    mongoInsert,
    mongoInsertMany,
    mongoDelete,
    mongoSortByDesc,
    mongoSortByAsc
}