require('dotenv').config()
const express = require('express')
const app = express()
const Cors = require('cors')
const xssFilter = require('x-xss-protection')
const logger = require('morgan')
const port = process.env.PORT || 5000
const bodyParser = require ('body-parser')

const categoryRoute = require('./src/routes/category')
const userRoute = require('./src/routes/user')
const bookRoute     = require('./src/routes/book')
const borrowingRoute = require('./src/routes/borrowing')
const Auth = require('./src/helpers/auth')

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     next();
//   });

const corsOptions = (req, callback) => {
  if (whitelist.split(',').indexOf(req.header('Origin')) !== -1) {
    console.log('Success')
    return callback(null, {
      origin: true
    })
  } else {
    console.log('Failed')
    return callback(null, {
      origin: false
    })
  }
}

app.use(Cors())
app.options('*', Cors(corsOptions))
app.use(xssFilter())
app.use(logger('dev'))

app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

app.use(`/book`, bookRoute)
app.use(`/category`, categoryRoute)
app.use(`/user`, userRoute)
app.use('/pinjam', borrowingRoute)

app.listen(port)
console.log(`Dimulai di port ${port}`)