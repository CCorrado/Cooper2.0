'use strict'

const HttpError = require('./HttpError')

class OAuthError extends HttpError {
  constructor (statusCode = 400, error, message, hint) {
    super(statusCode, {
      error,
      message,
      hint
    })
  }

  static makeInvalidRequestError (parameter) {
    return new OAuthError(
      400,
      'invalid_request',
      'The request was invalid.',
      `Check the ${parameter} parameter`
    )
  }

  static makeInvalidClientError () {
    return new OAuthError(
      401,
      'invalid_client',
      'Client authentication failed.'
    )
  }

  static makeInvalidCredentialsError () {
    return new OAuthError(
      401,
      'invalid_credentials',
      'The user credentials were incorrect.'
    )
  }

  static makeInvalidGrantError () {
    return new OAuthError(
      400,
      'invalid_grant',
      'The provided authorization grant was invalid. Check to ensure the token is still active.'
    )
  }

  static makeAccessDeniedError () {
    return new OAuthError(
      401,
      'access_denied',
      'Authorization Denied. Have you tried refreshing your access token?'
    )
  }

  static makeInvalidRefreshTokenError () {
    return new OAuthError(
      403,
      'invalid_request',
      'The refresh token is no longer valid.'
    )
  }
}

module.exports = OAuthError
