'use strict'

const env = require('dotenv').config()

if (env.error) {
  const { EnvInitializationError } = require('./errors/')
  throw new EnvInitializationError('Failed to initialize environmental variables.')
}

module.exports = function (name, value) {
  if (typeof value === 'undefined') {
    return process.env[name]
  }

  process.env[name] = value
}
