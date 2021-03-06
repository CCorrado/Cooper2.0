'use strict'

const axios = require('axios')
const urlJoin = require('url-join')
const env = require('../../env')
const DB_BASE_URL = env('DB_BASE_URL')
const { HttpError } = require('../../errors')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef UserSession
 * @property {[string]} accessToken
 * @property {[string]} tokenType
 * @property {[string]} expiresIn
 * @property {[string]} refreshToken
 * @property {[string]} username
 * @property {[string]} userId
 */

/**
 * @route GET /api/users/getUser
 * @group users - Get a user by id
 * @param {string} id.query.required - The ID of the user desired
 * @returns {UserSession.model} 200 - A User object
 * @returns {ErrorResponse.model}  default - HttpError - User not found
 * @security JWT
 */
module.exports = function (req, res, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'users', req.query.id))
    .then(function (response) {
      return res.status(200).json(response.data)
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to find the user'))
    })
}
