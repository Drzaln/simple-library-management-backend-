const express = require('express')
const Route = express.Router()
const multer = require('multer')
const path = require('path')

const bookController = require('../controllers/book')

let imageStore = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/images/')
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + '_' + Date.now() + path.extname(file.originalname)
    )
  }
})

let upload = multer({ storage: imageStore, limits: { fileSize: 1000000000 } })

Route.get('/', bookController.getBook)
  .get('/:id_buku', bookController.getBookId)
  .post(`/`, upload.single('image'), bookController.insertBook)
  .patch(`/:id_book`, bookController.updateBook)
  .delete(`/:id_book`, bookController.deleteBook)

module.exports = Route
