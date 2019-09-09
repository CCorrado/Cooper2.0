'use strict'

const env = require('dotenv').config()

if (env.error) {
  const { InitializationError } = require('./errors/')
  throw new InitializationError('Failed to initialize environmental variables.')
}

module.exports = function (name, value) {
  if (typeof value === 'undefined') {
    return process.env[name]
  }

  process.env[name] = value
}
