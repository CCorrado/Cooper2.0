'use strict'

const HttpError = require('../errors/HttpError')

module.exports = function (err, req, res, next) {
  if (err instanceof HttpError === false) {
    err = new HttpError(500, { message: err.message })
  }

  res.status(err.getStatusCode()).send(err.getBody())

  next(err)
}
