
const express = require('express'); // sunucu oluşturmak için eklendi
const app = express(); // express sunucuyu aktif yapmak için
const port = 3000; // bilgisayarın istekleri dinleyeceği port tanımlandı

const countryRouter = require('./router/countryRouter'); // tüm /country istekleri bu rota üzerinden gelir
const firstConnection = require('./db/onlyOne'); // program ilk çalıştığında, database oluşturmak, validation tanımı yapmak ve veri çekmek (fetch) gibi işlemlerin yapılacağı rota tanımlandı 

app.use(express.json()); // post, put gibi kullanıcıdan alınan isteklerin express sin anlayacağı şekilde dönüştürmesi için kullandığımız middleware dır.

firstConnection(); // program ilk çalıştığında mongodb bağlantısı yapar, "country" isimli db yoksa yeni db oluşturur ve fetch ile veri eklemesi yapar
// eğer "country" isimli database veritabanı varsa (yani daha önce oluşturulmuşsa) onun üzerinde işlemlere devam eder

app.use('/country', countryRouter); // /country isteği yapılırsa bu rota çalışır

app.use((req, res) => { // tanımlanan rotalar dışında bir istek yapılmışsa hem konsola hem tarayıcıya kullanıcı için uyarı mesajı verir
    console.log("Geçersiz bir istek yapılmıştır");
    res.send("Geçersiz bir istek yapılmıştır.")
})

/* 
    program çalıştığında sürekli 3000 portunu dinler ve bir istek geliyor mu diye kontrol eder. 
    ( Port numarasını istediğiniz şekilde tanımlayabilirsiniz ancak o port üzerinde başka bir servisin çalışmadığından emin olunuz )
    Örneğin port numarası 5000 olarak tanımlanırsa localhost url otomatik olarak değişecektir. Yeni localhost url;
    http://localhost:5000
*/
app.listen(port, () => { // 
    console.log(`${port} portu dinleniyor...`);
});






