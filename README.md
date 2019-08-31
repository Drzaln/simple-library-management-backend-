<div align=center>
<img src=https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png width="200px;" alt="X"/>
</div>
<div align=center>
<img src=https://www.diduenjoy.com/assets/home/integrations/rest-api-logo-860fda312cc922cddb94081c1fb0c0442777b596dbae3fedada2bed7c5232193.png width="100px;" alt="X"/>
</div>

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
1. Copy url repo ini `https://github.com/Drzaln/simple-library-management-backend-.git`
2. ```cd simple-library-management-backend-```
3. Jalankan perintah `$ npm install && npm start`

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