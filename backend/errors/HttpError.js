'use strict'

class HttpError extends Error {
  constructor (statusCode = 500, body = null) {
    super()

    this.statusCode = statusCode
    this.body = body
  }

  getStatusCode () {
    return this.statusCode
  }

  getBody () {
    return this.body
  }
}

module.exports = HttpError
