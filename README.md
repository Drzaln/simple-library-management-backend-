## Book REST
***
### Maybe useful
- list all book --> '/'
- search based on book id --> '/filter/?bookid='id'
- search based on book name, category, or location --> '/filter/?search='param'

### Requirement
- NodeJS
- NPM
- MySql
- Postman
- Code editor

### How to
1. Copy url repo ini `https://github.com/Drzaln/bootcamp-arkademy/tree/master/minggu-2/Tugas1_24-juni-19`
2. Download file pada repo ini dengan menggunakan tool ini [DownGit](https://minhaskamal.github.io/DownGit/)
3. Extract dan masuk ke direktori file
4. Jalankan perintah `$ npm install`

### .env file
```
$ npm i dotenv
$ nano .env
```
```
DB_HOST="Your_Host"
DB_USER="Your_Username"
DB_PASSWORD="Your_Password"
DB_NAME="Your_Table"

SERVER_PORT=8700
```

### Jalankan server
```$ npm start```