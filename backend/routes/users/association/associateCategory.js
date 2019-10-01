'use strict'

const { HttpError } = require('../../../errors')

function postCategory (req, res, next) {
  try {
    return res.status(201).json({ 'message': 'success' })
  } catch (err) {
    return next(HttpError({ statusCode: 400, body: err }))
  }
}

module.exports = { postCategory }
