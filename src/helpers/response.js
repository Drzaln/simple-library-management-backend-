const crypto = require('crypto')

module.exports = {
  response: (res, result, status, data) => {
    const resultPrint = {}
    if (result.affectedRows > 0) {
      if (result.insertId > 0) {
        resultPrint.status = 'Success',
        resultPrint.status_code = 200,
        resultPrint.message = 'Data success created !!',
        resultPrint.insertData = data
      } else if (result.changedRows > 0) {
        resultPrint.status = 'Success',
        resultPrint.status_code = 200,
        resultPrint.message = 'Data success Updated !!',
        resultPrint.updateDate = data
      } else {
        resultPrint.Status = 'Success',
        resultPrint.status_code = 200,
        resultPrint.message = 'Data success Deleted !!'
        resultPrint.insertData = data
      }
    } else if (result.length > 0) {
      resultPrint.error = null
      resultPrint.status_code = status || 200
      if (result.length == 1) {
        resultPrint.result = result[0]
      } else {
        resultPrint.result = result
      }
    } else {
      resultPrint.status = 'Not Success'
      resultPrint.status_code = 404
      resultPrint.message = 'Data Not Found'
    }
    return res.status(resultPrint.status_code).json(resultPrint)
  },

  generateSalt: (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
  },

  setPassword: (password, salt) => {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  }

}