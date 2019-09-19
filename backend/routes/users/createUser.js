'use strict'

const jwt = require('jsonwebtoken')
const axios = require('axios')

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
module.exports = function (req, res) {
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

  const newRequest = {
    'username': userRequest.username,
    'password': userRequest.password,
    'name': userRequest.name,
    'role': userRequest.role,
    'accessToken': userToken.access_token,
    'tokenType': userToken.token_type,
    'expiresIn': userToken.expires_in,
    'refreshToken': userToken.refresh_token
  }

  hashUserData(res, newRequest)
}

function hashUserData (res, user) {
  return sendNewUser(res, user)
}

function sendNewUser (res, user) {
  // Save this user to the database
  return axios.post('http://cooper-database-api:5432/users', user)
    .then(function (response) {
      user.accessToken = sha.sha256()
      return res.status(201).send(response.data)
    })
    .catch(function (error) {
      return res.status(error.response.status).send(error.response.data)
    })
}
