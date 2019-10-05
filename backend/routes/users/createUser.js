'use strict'

const jwt = require('jsonwebtoken')
const axios = require('axios')
const bcrypt = require('bcryptjs')
const urlJoin = require('url-join')

const env = require('../../env')
const { HttpError } = require('../../errors')
const DB_BASE_URL = env('DB_BASE_URL')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef RegisterRequest
 * @property {{tester1@test.com}} username - username (email)
 * @property {{Test1234}} password - user's password
 * @property {{Chris}} name - user's name
 * @property {{User}} role - user's role (User, Business, etc)
 */

/**
 * @typedef RegisterResponse
 * @property {[string]} accessToken
 * @property {[string]} tokenType
 * @property {[string]} expiresIn
 * @property {[string]} refreshToken
 * @property {[string]} username
 * @property {[string]} userId
 * @property {[string]} userCreatedDate
 * @property {[string]} SessionCreatedDate
 * @property {[string]} name
 */

/**
 * @route POST /users/register
 * @group users - Create a new user
 * @param {RegisterRequest.model} RegisterRequest.body.required - the new registration request
 * @returns {RegisterResponse.model} 200 - A New User object
 * @returns {ErrorResponse.model}  default - HttpError - User not found
 */
module.exports = function (req, res, next) {
  const options = {}
  const userRequest = {
    'username': req.body.username,
    'password': req.body.password,
    'name': req.body.name,
    'role': req.body.role
  }

  const userToken = {
    'access_token': jwt.sign({}, 'cooper', Object.assign(options, { expiresIn: '2 hours' })),
    'token_type': 'bearer',
    'expires_in': 60 * 60 * 24,
    'refresh_token': jwt.sign({}, 'cooper', Object.assign(options, { expiresIn: '2 days' }))
  }

  let newRequest = {
    'username': userRequest.username,
    'password': userRequest.password,
    'name': userRequest.name,
    'role': userRequest.role,
    'accessToken': userToken.access_token,
    'tokenType': userToken.token_type,
    'expiresIn': userToken.expires_in,
    'refreshToken': userToken.refresh_token
  }
  hashUserData(res, newRequest, next)
}

function hashUserData (res, user, next) {
  // some hash functions here.
  let tmpPWD = user.password
  user.password = bcrypt.hashSync(tmpPWD, 10)
  if (bcrypt.compareSync(user.password, tmpPWD)) {
    return sendNewUser(res, user, next)
  } else {
    next(new HttpError(400, 'Password is invalid'))
  }
}

function sendNewUser (res, user, next) {
  // Save this user to the database
  return axios.post(urlJoin(DB_BASE_URL, 'users'), user)
    .then(function (response) {
      // make sure returning token here. token format TBD
      return res.status(201).json({
        username: response.data.username,
        name: response.data.name,
        role: response.data.role,
        accessToken: response.data.accessToken,
        tokenType: response.data.tokenType,
        expiresIn: response.data.expiresIn,
        refreshToken: response.data.refreshToken
      })
    })
    .catch(function (error) {
      next(new HttpError(400, error))
    })
}
