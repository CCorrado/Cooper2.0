'use strict'

const HttpError = require('./HttpError')

class UserError extends HttpError {
  constructor (statusCode = 400, error, message, hint) {
    super(statusCode, { error, message, hint })
  }

  static makeServiceError () {
    return new HttpError(400)
  }

  static makeInvalidRequestError (parameter) {
    return new UserError(
      400,
      'invalid_request',
      'The request was invalid.',
      `Check the ${parameter} parameter`
    )
  }
}

module.exports = UserError
