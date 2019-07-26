const express = require('express')
const Route = express.Router()

const borrowingController = require('../controllers/borrowing')
 
Route 
  .get('/', borrowingController.getBorrowing)
  .get('/details/:id', borrowingController.detBorrowing)
  .post(`/`, borrowingController.insertBorrowing)
  .patch(`/:id_buku`, borrowingController.updateBorrowing)
  .delete(`/:id_borrowing`, borrowingController.deleteBorrowing)

module.exports = Route
