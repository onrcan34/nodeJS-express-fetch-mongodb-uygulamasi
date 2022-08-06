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

### tüm paketleri tek seferde kurmak için
```
npm i
```
![image](https://user-images.githubusercontent.com/64845818/183238232-175209ae-2cab-41b5-a612-cd742d55fcc4.png)


### Konsol uygulamamızı çalıştırmak için
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
localhost:/3000/country/pakistan http get isteği yapıldığında, pakistan ülkesi veritabanında var mı diye kontrol eder.
pakistan ismine sahip ülke varsa db den bu veri alınır ve tarayıcıya response edilir. Ayrıca konsol
ekranında, "Pakistan ülke bilgisi görüntüleniyor..." şeklinde bilgi mesajı verilir.
```

![p4_Send](https://user-images.githubusercontent.com/64845818/183241584-ed2a3695-f255-4b08-b0e9-ddb3ea13a706.png)


### localhost:3000/player post isteğinde bulunmak (postman işlemleri)
```
Post isteğinde bulunmak için postman uygulaması kullanılmıştır. 
```
https://www.postman.com/downloads/
![img2](https://user-images.githubusercontent.com/64845818/182619068-f08e5d59-d0d5-4f86-9e6d-259d24a139d5.png)

```
istek sonucundan response olarak gönderilen veri aşağıdaki gibidir.
```
![img3](https://user-images.githubusercontent.com/64845818/182619546-223e07dd-43cc-4bff-9a3d-c862d3956b19.PNG)

### localhost:3000/player/3 delete isteğinde bulunmak
```
localhost:3000/player/3 url adresine delete işlemi uygulandığında parametre olarak verilen 3 değeri 
footballer.json dosyasında var mı diye kontrol edilir eğer varsa bu id ye sahip değer footballer diziden
silinir. Eğer bu id ye sahip değer bulunmuyorsa "X id li futbolcu dizide bulunamamıştır!" şeklinde
hem konsola hem de tarayıcıya uyarı mesajı gönderir.
```

```
localhost:3000/player/3 isteği sonucu 3 id li değer footballer.json dosyasında varsa 
aşağıdaki response döner.
```
![img4](https://user-images.githubusercontent.com/64845818/182622889-e979f6c4-32a0-4995-b6e3-6231877e6db8.PNG)

```
localhost:3000/player/25 isteği sonucu 25 id li değer footballer.json dosyasında bulunamadıysa
aşağıdaki response döner.
```
![img5](https://user-images.githubusercontent.com/64845818/182624216-fe10a45d-a098-413c-a82e-fa04ca6e14a7.PNG)

### localhost:3000/player/1 put isteğinde bulunmak
```
localhost:3000/player/1 url adresine put isteği yapıldığında parametre olarak verilen 1 değeri 
footballer.json dosyasında var mı diye kontrol edilir eğer varsa bu id ye sahip değer üzerinde güncelleme
işlemi yapılır.
```

![img6](https://user-images.githubusercontent.com/64845818/182629803-3e686f89-3c95-4b1e-82df-bee0d85b4618.PNG)

```
localhost:3000/player/1 isteği sonucu 1 id li değer footballer.json dosyasında varsa ve güncellenecek 
değerlerde herhangi bir hata tespit edilmediyse aşağıdaki response döner.
```

![img9](https://user-images.githubusercontent.com/64845818/182630265-4016d5d7-646d-44f6-a673-8e30caebde59.PNG)

```
localhost:3000/player/1 isteği sonucu 1 id li değer footballer.json dosyasında varsa ve güncellenecek 
değerlerde herhangi bir hata tespit edildiyse aşağıdaki response döner.
```
![img7](https://user-images.githubusercontent.com/64845818/182631028-749385c3-d999-49df-add2-6e065a68e1de.PNG)







