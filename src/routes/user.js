const express = require('express')
const Route = express.Router()
const Auth = require('../helpers/auth')

const userController = require('../controllers/user')

Route.all('/*', Auth.authInfo)
  .get('/', Auth.accessToken, userController.getUser)
  .post(`/register`, userController.register)
  .post(`/login`, userController.login)
  .patch(`/:id_user`, userController.updateUser)
  .delete(`/:id_user`, userController.deleteUser)

module.exports = Route
