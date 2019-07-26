const conn = require('../config/connect')

module.exports = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_user', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateUser: (id_user, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        'UPDATE tb_user SET ? WHERE id_user=?',
        [data, id_user],
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
  deleteUser: id_user => {
    return new Promise((resolve, reject) => {
      conn.query(
        'DELETE FROM tb_user WHERE id_user=?',
        id_user,
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

  register: data => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO tb_user SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getByEmail: email => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM tb_user WHERE email=?`,
        email,
        (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        }
      )
    })
  }
}
