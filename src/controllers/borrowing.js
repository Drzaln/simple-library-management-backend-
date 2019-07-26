const borrowingModel = require('../models/borrowing')
const help = require('../helpers/response')

module.exports = {
  getBorrowing: (req, res) => {
    borrowingModel
      .getBorrowing()
      .then(resultBorrowing => {
        help.response(res, resultBorrowing, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  detBorrowing: (req, res) => {
    const id = req.params.id
    borrowingModel
      .detBorrowing(id)
      .then(resultBorrowing => {
        help.response(res, resultBorrowing, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertBorrowing: (req, res) => {
    const data = {
      id_buku: req.body.id_buku,
      id_user: req.body.id_user,
      nama_user: req.body.nama_user,
      tgl_pinjam: new Date(),
      lama_pinjam: req.body.lama_pinjam,
      // tgl_kembali: req.body.tgl_kembali,
      // denda: req.body.denda
    }

    borrowingModel
      .insertBorrowing(data)
      .then(resultBorrowing => {
        const result = resultBorrowing
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateBorrowing: (req, res) => {
    const id_buku = req.params.id_buku
    const data = 'ada'
    borrowingModel
      .updateBorrowing(id_buku, data)
      .then(resultBorrowing => {
        const result = resultBorrowing
        help.response(res, result, 200, [id_buku, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteBorrowing: (req, res) => {
    const id_user = req.params.id_borrowing

    borrowingModel
      .deleteBorrowing(id_user)
      .then(resultBorrowing => {
        const result = resultBorrowing
        help.response(res, result, 200, id_user)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
