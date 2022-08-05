
const { MongoClient } = require('mongodb'); // mongodb paketinin MongoClient sınıfını dahil edildi

const dbInfo = require('./dbInfo');  // database bilgilerinin yazılı olduğu modül dahil edildi.
const {dbURL, dbName, collectionName} = dbInfo; // db bilgileri destructuring yapısı ile değişkenlere atandı 

/* 
    Aşağıdaki fonksiyon program ilk başlatıldığında, veritabanına veri ekleme kurallarını belirler. Yani validate işlemlerini yapar 
*/
function createOurSchema() { 
    MongoClient.connect(dbURL) // db bağlantısı yapar
        .then(result => {
            const db = result.db(dbName) // veritabanı ismini belirler
            db.createCollection(collectionName, { // veritabanı collection yapısında uygulamak istediğimiz kurallar ile birlikte oluşturur
                validator: {
                    $jsonSchema: { // verileri json yapısında olacağını söyler
                        bsonType: "object", // eklenen veriler object türünde olması gerektiğini belirler
                        required: ["countryName", "capital", "population"], // bu alanlar girilmesi zorunlu alanlar olarak belirlendi
                        properties: {
                            countryName: { 
                                bsonType: "string", // countryName verilerinin sadece string veri türünde girilmesi gerektiğini söyler 
                                description: "zorunlu alan ve string olmalı"
                            },
                            capital: {
                                // bsonType: "string", // bu alan normalde string olarak tanımlaması gerekir ancak fetch ile alınan verilerin çoğu string türünde değildir
                                description: "zorunlu alan"         // veri kaybını engellemek için bu alanın veri türünü belirlemek istemedim
                            },
                            population: {
                                bsonType: "int", // veri türü sadece integer olarak girilmesi gerektiğini söyler
                                minimum: 0,
                                maximum: 2000000000000,
                                description: "0 ile 2 milyar arasında, integer olmalı ve zorunlu alan"
                            },
                        }
                    }
                }
            })
            console.log("Validation schema oluşturuldu"); // validation (doğrulama) işlemleri tamamlandığında konsola bilgi mesajı verir.
        });
}


module.exports = createOurSchema; // validate işlemlerinin main dosyası olan app.js tarafından tanınması için dışarıya export edilir.