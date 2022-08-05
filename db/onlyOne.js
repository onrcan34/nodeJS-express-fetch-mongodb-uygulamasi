
const { MongoClient } = require('mongodb'); // mongodb paketinin MongoClient sınıfını dahil edildi

const dbInfo = require('./dbInfo'); // database bilgilerinin yazılı olduğu modül dahil edildi.
const {dbURL, dbName, collectionName} = dbInfo; // db bilgileri destructuring yapısı ile değişkenlere atandı 

const firstDataSave = require('./firstData'); // fetch isteğinin mongodb tarafından tanınması için dahil edildi

/* 
    Bu fonksiyon program ilk kez çalıtığında veritbanı bulunmuyorsa tetiklenir.
*/
const firstConnection = () => {
    MongoClient.connect(dbURL) // mongodb bağlantısı yapıldı
        .then(sonuc => {
            const db = sonuc.db(dbName); // veritabanı ismini belirler
            db.listCollections().toArray() // veritbanında bulunan tüm collection ları getirir.
                .then(sonuc => {
                    const myCollection = db.collection(collectionName); // işlem yapılacak collection belirlenir
                    const sonucum = sonuc.find((value) => value.name === 'info') // üzerinde işlem yapılan veritabanında "info" isimli collection var mı diye kontrol eder
                    if (sonucum) { } // veritabanı "info" isimli collection a sahipse if çalışır. 
                    else { // veritabanı "info" isimli collection a sahip değilse else çalışır.
                        (async () => { await firstDataSave(myCollection)})(); // fetch ile veriler db ye kaydedilir.
                        console.log("İlk veriler fetch ile eklenmiştir.");
                    }
                })
                .catch(err => { // collection lar listelenirken bir sorun oluşursa hata buarada yakalanır
                    console.log(err);
                    return err;
                })
            console.log(`${dbName} isimli database e bağlantı başarılı`);
        })
        .catch(err => { // mongo db ye bağlantı başarısız olursa catch bloğu çalışır.
            console.log("DB ye bağlanılamadı");
            return err;
        })
}

module.exports = firstConnection; // firstConnection fonksiyonunun app.js tarafından ulaşılması için dışarıya export edilir.
