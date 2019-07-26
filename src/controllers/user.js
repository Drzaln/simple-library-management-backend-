const userModel = require('../models/user')
const resp = require('../helpers/response')
const jwt = require('jsonwebtoken')

module.exports = {
  getUser: (req, res) => {
    userModel
      .getUser()
      .then(resultUser => {
        resp.response(res, resultUser, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertUser: (req, res) => {
    const data = {
      id_user: req.body.id_user,
      nama_user: req.body.nama_user,
      pass_user: req.body.pass_user
    }

    userModel
      .insertUser(data)
      .then(resultUser => {
        const result = resultUser
        resp.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateUser: (req, res) => {
    const id_user = req.params.id_user
    const data = {
      id_user: req.body.id_user,
      nama_user: req.body.nama_user
    }
    userModel
      .updateUser(id_user, data)
      .then(resultUser => {
        const result = resultUser
        resp.response(res, result, 200, [id_user, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteUser: (req, res) => {
    const id_user = req.params.id_user

    userModel
      .deleteUser(id_user)
      .then(resultUser => {
        const result = resultUser
        resp.response(res, result, 200, id_user)
      })
      .catch(error => {
        console.log(error)
      })
  },

  register: (req, res) => {
    const salt = resp.generateSalt(18)
    const passwordHash = resp.setPassword(req.body.password, salt)

    const data = {
      id_user: req.body.id_user,
      nama_user: req.body.nama_user,
      email:req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: 'Test',
      status: 1,
      created_at: new Date(),
      updated_at: new Date()
    }

    userModel
      .register(data)
      .then(resultRegister => {
        resp.response(res, resultRegister, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },

  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userModel
      .getByEmail(email)
      .then(result => {
        const dataUser = result[0]
        const usePassword = resp.setPassword(password, dataUser.salt)
          .passwordHash

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign(
            {
              id_user: dataUser.id_user
            },
            process.env.SECRET_KEY,
            { expiresIn: '10s' }
          )

          delete dataUser.salt
          delete dataUser.password

          // return resp.response(res, dataUser, 200)
          res.json(dataUser)
        } else {
          // return resp.response(res, null, 403, 'Password Salah!')
          res.json('Password Salah')
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
