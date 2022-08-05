
/* 
    mongodb veritabanına bağlanmak için gerekli bilgiler aşağıda bulunur.
*/
const dbInfo = {
    dbURL: 'mongodb://localhost:27017',
    dbName: 'country',
    collectionName: 'info',
}

module.exports = dbInfo; // bu bilgilerin diğerki modüller tarafından ulaşılması için dışarıya export edilir.