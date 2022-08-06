# nodeJS-express-fetch-mongodb-uygulamasi
nodeJS ile sunucu altyapısı oluşturan, express ile get, post, put, delete işlemleri yapan, fetch ile api kaynağından veri alan, mongodb ile veritabanı işlemleri yapan kapsamlı bir uygulama 

# Getting Started - Proje Hakkında
Bu proje nodeJS kullanılarak geliştirmiştir. Projede kullanılan npm paketlerinden express ile sunucu oluşturulur. fetch ile bir api kaynağından veri çekilir. Veritabanı işlemleri için mongoDB veritabanı kullanılır. express bize http isteklerimizi (get, post, put, delete) karşılayan bir sunucu görevi görür. Proje başlatıldığında program ilk olarak mongodb de kayıtlı country isimli veritabanı ve bu veritabanına ait "info" isiminde bir collection var mı diye kontrol eder. Yoksa country isminde bir db oluşturur ve içerisine info isimli bir collection ekler. Bu ekleme işlemi yapılırken validation (doğrulama) işlemleri için veritabanın kurallarını belirler. Veritabanı ve collection oluşturulduktan sonra 250 tane veri fetch ile get isteği yapılarak veritabanına eklenir. Kullanıcı bu veriler üzerinden get (veri getir), post (veri ekle), delete (veri sil) ve put (veri güncelle) istekleri yapabilir. Program çalışır durumda iken tarayıcının url kısmına http://localhost:3000/country yazarak get isteğinde bulunur. Sonuç olarak veri tabanında veriler okunur ve tarayıcıya response olarak gönderilir. Ayrıca http://localhost:3000/country/artan veya http://localhost:3000/country/azalan gibi get istekleri yaparak, veritabanındaki population (nüfus) verileri baz alınarak azdan çoğa veya çoktan aza şeklinde ülke nüfus sıralaması yapılabilir. Diğer yandan post (veri gönder) ve put (veri güncelle) http isteklerini yapabilmek için postman isminde bir uygulamaya ihtiyaç vardır. Postman sayesinde uzun uzun kodlar yazmak yerine API lerimizi kolayca test edebiliriz.
```
NOT!!!
Bu proje ile veriler mongoDB veritabanında tutulur. Böylelikle uygulamayı kapatıp açtığınızda verileriniz 
silinmez.
```

# Prerequisites - Gereklilikler
| Gerekli Paket ve Modüller | İndirme İşlemi |
| ------ | ------ |
| node module | https://nodejs.org/en/download/ |
| mongodb | https://www.mongodb.com/try/download/community |
| postman | https://www.postman.com/downloads/ |
| all npm packages | npm install |

# Installing - Kurulum

### Projeyi terminal üzerinden indirmek için
```
git clone https://github.com/onrcan34/nodeJS-express-fetch-mongodb-uygulamasi.git
```
![image](https://user-images.githubusercontent.com/64845818/183238138-9e5d453a-25d8-48b2-aac5-2b321be67c2f.png)

### Proje dizinine geçmek için
```
cd nodeJS-express-fetch-mongodb-uygulamasi
```
![image](https://user-images.githubusercontent.com/64845818/183238157-11d237db-8671-45c7-b995-8f57240cc90c.png)

### Tüm paketleri tek seferde kurmak için
```
npm i
```
![image](https://user-images.githubusercontent.com/64845818/183238232-175209ae-2cab-41b5-a612-cd742d55fcc4.png)


### Uygulamayı çalıştırmak için
```
node app.js 
```
![image](https://user-images.githubusercontent.com/64845818/183238271-346f6612-99bc-4d91-862c-e6c89595c4c3.png)

```
Görüldüğü gibi sunucu 3000 portunu gelebilecek herhangi bir http isteğine response (cevap) göndermek
için dinler. Program ilk kez çalıştırıldığında mongodb üzerinde country isimli database yoksa bu veritabanını ve 
onun "info" isminde bir collection nunu oluşturur, validation (doğrulama) işlemleri için de bir validatation
scheması tanımlar. Son olarak fetch ile ücretsiz bir api kaynağından ( https://restcountries.com/v3.1/all ) 
ülke verilerini almak için get işlemi yapar.
```

![image](https://user-images.githubusercontent.com/64845818/183238471-5ab19db9-8974-473e-8112-0c3a488bae1a.png)

```
mongoDB Compass veritabanı gösterimi 
```
![p0_Send](https://user-images.githubusercontent.com/64845818/183240884-3d736014-70f6-47c4-902f-93d6753caee1.png)

```
mongoDB Compass veritabanı validation (doğrulama) işlemleri 
```
![p00_Send](https://user-images.githubusercontent.com/64845818/183240908-cbb762f8-1e21-4652-be31-cf3a899be561.png)


```
Program ikince kez çalıştırıldığında, ilk olarak proje dizininde country isimli database var mı diye kontrol işlemi
işlemi yapar. Eğer aynı isimde db varsa yeni database oluşturmaz. Bu db üzerinden işlemlere devam eder. Böylelikle
veriler kalıcı ve tutarlı olur.

```
![image](https://user-images.githubusercontent.com/64845818/183238597-bd49dd69-ef1a-4612-b008-08cc8823aa3e.png)


### node the term 'node' is not recognized as the name of a cmdlet hatası için
```
Bu hata, kurulumunu yaptığımız node dizini yolunun bulunamamasından kaynaklıdır. Bu hatayı düzeltmek için 
path ayarı yapılmalır. Aşağıdaki link hata çözümüne yardımcı olacaktır.
```
https://www.youtube.com/watch?v=pg4t48BPmh8

![image](https://user-images.githubusercontent.com/64845818/182600071-969bdf3d-a88f-4469-ad54-01ad1fe8edf4.png)


### localhost:3000/country get isteğinde bulunmak
```
localhost:3000/country şeklinde sunucuya http get isteği yapılır ve response olarak aşağıdaki cevap döner. 
```
![p1_Send](https://user-images.githubusercontent.com/64845818/183239143-9ff8cebd-8baf-4a20-b885-b96eb1597ac1.png)


### localhost:3000/country/azalan get isteğinde bulunmak
```
localhost:3000/country/azalan şeklinde sunucuya http get isteği yapıldığında response olarak veritabanında
bulunan ülkerin nüfus (population) sayılarına göre çoktan aza doğru sıralama işlemi yapılır.
```
![p2_Send](https://user-images.githubusercontent.com/64845818/183239750-18cf1eed-c3b2-4d3f-993d-5670b2c20e17.png)

### localhost:3000/country/artan get isteğinde bulunmak
```
localhost:3000/country/artan şeklinde sunucuya http get isteği yapıldığında response olarak veritabanında
bulunan ülkerin nüfus (population) sayılarına göre azdan çoğa doğru sıralama işlemi yapılır.
```
![p3_Send](https://user-images.githubusercontent.com/64845818/183239761-1d926825-b027-44d5-8bbf-353d01744008.png)


### localhost:3000/country/{countryName} get isteğinde bulunmak
```
localhost:/3000/country/pakistan adresine http get isteği yapıldığında, pakistan ülkesi veritabanında var mı diye kontrol eder.
pakistan ismine sahip ülke varsa db den bu veri alınır ve tarayıcıya response edilir. Ayrıca konsol
ekranında, "Pakistan ülke bilgisi görüntüleniyor..." şeklinde bilgi mesajı verilir.
```

![p4_Send](https://user-images.githubusercontent.com/64845818/183241584-ed2a3695-f255-4b08-b0e9-ddb3ea13a706.png)


### localhost:3000/country post isteğinde bulunmak ( postman uygulaması gereklidir )
```
localhost:3000/country adresine http post isteği yapıldığında, veritabanına kaydetmek istenen veriler
ilk önce mongodb nin validation işlemlerinden geçer. Bir hata tespit edilirse veri eklenmez ve hata mesajı
iletilir. Eğer bir sorun tespit edilmezse veriler mongoDB içerisinde yer alan country veritabanın info
collectionuna kaydedilir.
```

![p5_Send](https://user-images.githubusercontent.com/64845818/183245988-7f77974c-18da-4eb7-8a24-0b26ec760406.png)

```
Post işleminde bir sorun olmazsa veri başarılı şekilde db ye kaydedilir. Yukarıda post edilen "newcountry"
ülkesinin veritabınında var mı diye kontrolü sonucunda veri başarılı bir şekilde response edilmiştir.
```

![p6_Send](https://user-images.githubusercontent.com/64845818/183246052-0ab815aa-1cb3-4f18-892e-8735779b4e22.png)

```
Post işleminde bir sorun olursa veri db ye kaydedilmez. Sorunun hangi hatadan kaynaklandığını kullanıcıya
göstermek için hata mesajı konsol ekranına yazdırılır ve tarayıcıya response edilir.
```

![p7_Send](https://user-images.githubusercontent.com/64845818/183246127-109ae85e-3344-4b5c-b8bb-96c8ed2bcb24.png)


### localhost:3000/country/{countryName} delete isteğinde bulunmak
```
localhost:/3000/country/portugal adresine http delete isteği yapıldığında, portekiz ülkesi veritabanında 
var mı diye kontrol edilir. portugal ismine sahip ülke varsa db den bu veri silinir ve güncellenen veritabanı
tarayıcıya response edilir. Ayrıca konsol ekranına, "Portugal ülkesi silindi" şeklinde bilgi mesajı verilir.
```

![p8_Send](https://user-images.githubusercontent.com/64845818/183247021-0940af74-6415-4068-91c4-73af6861de6b.png)

```
Eğer portugal isminde bir veri, veritabanında bulunmuyorsa "Portugal ülkesi listede bulunamadı!" şeklinde 
konsola ve tarayıcıya bilgilendirme mesajı yazar. Bir önceki adımda portugal verisi delete isteği ile silindi. Bu sebeple
Portugal verisine tekrardan delete isteği yapıldığında, veri database de bulunmadığından silme işlemi
gerçekleşmez.
```

![p9_Send](https://user-images.githubusercontent.com/64845818/183247174-5de40299-d3ce-4f45-afaa-4eebe7aa700d.png)


### localhost:3000/home/contact geçersiz bir istekte bulunmak
```
Eğer tanımlananlar dışında url e bir istek yapılırsa bu tespit edilir ve "Geçersiz bir istek yapılmıştır" 
şeklinde uyarı mesajını hem konsol ekranına hemde tarayıcıya response eder.
```

![p10_Send](https://user-images.githubusercontent.com/64845818/183247278-6d2cf7d8-fd1d-4d99-8d38-088f8bb493d1.png)







