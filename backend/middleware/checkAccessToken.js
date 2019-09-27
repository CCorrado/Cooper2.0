'use strict'

const OAuthError = require('../errors/OAuthError')
const jwt = require('jsonwebtoken')

function check (req, res, next) {
  if (req.headers.hasOwnProperty('authorization') === false) {
    throw OAuthError.makeAccessDeniedError()
  }

  const [type, token] = req.headers.authorization.split(' ')

  if (type !== 'Bearer') {
    throw OAuthError.makeAccessDeniedError()
  }

  let decodedToken

  try {
    decodedToken = jwt.verify(token, 'cooper')
  } catch (err) {
    throw OAuthError.makeAccessDeniedError()
  }

  if (req.hasOwnProperty('cooper') === false) {
    req.cooper = {}
  }

  req.cooper.userId = decodedToken.sub

  next()
}

module.exports = check
