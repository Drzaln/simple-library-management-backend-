const bookModel = require('../models/book.js')
const resp = require('../helpers/response')
const multer = require('multer')
const path = require('path')
const cloudinary = require('cloudinary')

module.exports = {
  getBook: (req, res) => {
    let limit = parseInt(req.query.limit) || 6
    let page = parseInt(req.query.page) || 1
    bookModel
      .getBook(limit, page)
      .then(resultBook => {
        resp.response(res, resultBook, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },

  getBookId: (req, res) => {
    const id_buku = req.params.id_buku
    bookModel
      .getBookId(id_buku)
      .then(resultBook => {
        resp.response(res, resultBook, 200, id_buku)
      })
      .catch(error => {
        console.log(error)
      })
  },

  insertBook: async (req, res) => {
    // let fileName = '/images/' + req.file.filename
    const path = req.file.path
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: 'drkil2jlo',
        api_key: '742171894379478',
        api_secret: 'E-YamDDHf2I6Y3k5TQ9sqh4A9Aw'
      })

      let dataImg
      await cloudinary.uploader.upload(path, result => {
        console.log(`coba cloud`, path)
        dataImg = result.url
      })
      return dataImg
    }
    console.log('nama file', path)

    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku: req.body.nama_buku,
      // image: await getUrl(),
      ringkasan: req.body.ringkasan,
      penulis_buku: req.body.penulis_buku,
      // gmb_buku: req.body.gmb_buku,
      gmb_buku: await getUrl(),
      status_pinjam: 'ada',
      lokasi_buku: req.body.lokasi_buku
    }

    bookModel
      .insertBook(data)
      .then(resultBook => {
        const result = resultBook
        resp.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateBook: (req, res) => {
    const id_buku = req.params.id_book
    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku: req.body.nama_buku,
      ringkasan: req.body.ringkasan,
      penulis_buku: req.body.penulis_buku,
      gmb_buku: req.body.gmb_buku,
      lokasi_buku: req.body.lokasi_buku
    }
    bookModel
      .updateBook(id_buku, data)
      .then(resultBook => {
        const result = resultBook
        resp.response(res, result, 200, [id_buku, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteBook: (req, res) => {
    const id_buku = req.params.id_book
    bookModel
      .deleteBook(id_buku)
      .then(resultBook => {
        const result = resultBook
        resp.response(res, result, 200, id_buku)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
