const conn = require('../config/connect')

module.exports = {
  getBook: (limit, page) => {
    let offset = limit * page - limit
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT  * FROM  tb_buku LEFT JOIN tb_kategori  ON tb_buku.id_kategori = tb_kategori.id_kategori ORDER BY id_buku desc LIMIT ? OFFSET ?',
        [limit, offset],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  getBookId: id_buku => {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM tb_buku WHERE id_buku=?',
        id_buku,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  searchBook: search => {
    return new Promise((resolve, reject) => {
      const cari = `%${search}%`
      conn.query(
        'SELECT tb_buku.id_buku, tb_buku.nama_buku, tb_buku.penulis_buku, tb_kategori.nama_kategori FROM tb_buku INNER JOIN nama_kategori ON tb_buku.id_kategori = tb_kategori.id_kategori WHERE id_buku LIKE ? WHERE nama_buku LIKE ? WHERE penulis_buku LIKE ? WHERE nama_kategori LIKE ?',
        [cari, cari, cari, cari],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  insertBook: data => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_buku SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateBook: (id_buku, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        'UPDATE tb_buku SET ? WHERE id_buku=?',
        [data, id_buku],
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  deleteBook: id_buku => {
    return new Promise((resolve, reject) => {
      conn.query(
        'DELETE FROM tb_buku WHERE id_buku=?',
        id_buku,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  }
}
