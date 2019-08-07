const express = require('express')
const Route = express.Router()
const Auth = require('../helpers/auth')

const userController = require('../controllers/user')

Route
  // .all('/*', Auth.authInfo)
  // .get('/', Auth.accessToken, userController.getUser)
  // .delete(`/:id_user`, Auth.authInfo, userController.deleteUser)
  .get('/', userController.getUser)
  .post(`/register`, Auth.authInfo, userController.register)
  .post(`/login`, Auth.authInfo, userController.login)
  .patch(`/:id_user`, Auth.authInfo, userController.updateUser)
  .delete(`/:id_user`, userController.deleteUser)

module.exports = Route
