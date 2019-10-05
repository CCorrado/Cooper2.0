'use strict'
const axios = require('axios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const urlJoin = require('url-join')

const { HttpError } = require('../../errors')
const env = require('../../env')
const OAuthErr = require('../../errors/OAuthError')
const DB_BASE_URL = env('DB_BASE_URL')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef LoginRequest
 * @property {{tester1@test.com}} username - username (email)
 * @property {{Test1234}} password - user's password
 */

/**
 * @route POST /users/login
 * @group users - Login existing user
 * @param {LoginRequest.model} LoginRequest.body.required - the new login request
 * @returns {LoginResponse.model} 200 - The User's information and session
 * @returns {ErrorResponse.model}  default - HttpError - User not found
 */
module.exports = function (req, res, next) {
  const options = {}
  const userRequest = {
    'username': req.body.username,
    'password': req.body.password
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
    'accessToken': userToken.access_token,
    'tokenType': userToken.token_type,
    'expiresIn': userToken.expires_in,
    'refreshToken': userToken.refresh_token
  }

  getUserObjectIfExists(res, newRequest, next)
}

function getUserObjectIfExists (res, user, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'users?username=' + user.username))
    .then(function (response) {
      return hashUserData(res, response.data, user.password, user, next)
    })
    .catch(function (error) {
      next(new HttpError(400, error))
    })
}

function hashUserData (res, user, pwAttempted, userToken, next) {
  user.pwAttempted = pwAttempted
  // signin session
  // 1.require data from db
  // 2.compare data
  // 3.if yes refresh token.
  // 4.else return 403
  if (bcrypt.compareSync(user.password, pwAttempted)) {
    // check Token
    // if Token yes
    if (jwt.verify(user.refresh_token, userToken.refresh_token)) {
      return sendLoginUser(res, user, next)
    } else {
      user.refresh_token = userToken.refresh_token
      return res.redirect(307, '/users/login')
    }
    // and refresh
    // else
    // refresh token and require re-sign-in
  } else {
    return OAuthErr.makeInvalidCredentialsError()
  }
}

function sendLoginUser (res, user, next) {
  // Save this user to the database
  return axios.post(urlJoin(DB_BASE_URL, 'users', 'newSession'), user)
    .then(function (response) {
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
