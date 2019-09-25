'use strict'

const urlJoin = require('url-join')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const error = require('../../../errors/OAuthError')
const env = require('../../../env')
const DB_BASE_URL = env('DB_BASE_URL')

/**
 * @typedef CategoryRequest
 * @property {{zzhan26@test.com}} username - username (zzhan26)
 * @property {{Stevens}} faculty - faculty (Stevens)
 * @property {{}} timerange - timerange (TBD)
 */

/**
 * @typedef CategoryResponse
 * @property {{zzhan26@test.com}} username - username (zzhan26)
 * @property {{Stevens}} faculty - faculty (Stevens)
 * @property {{courses}} courseList - courseList ()
 */

/**
 * @route GET /association/associate_category
 * @group association - Category
 * @param {timerange}
 * @returns {CategoryResponse.model}
 * @returns {ErrorResponse.model}
 */

module.exports = (res, req) => {
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

  const Category = {
    //TBD
  }
  let userData = {
    'username': userRequest.username,
    'password': userRequest.password,
    'name': userRequest.name,
    'role': userRequest.role,
    'accessToken': userToken.access_token,
    'tokenType': userToken.token_type,
    'expiresIn': userToken.expires_in,
    'refreshToken': userToken.refresh_token
  }
  associateCategory(res, userData)
}

function associateCategory(res, user, category) {
  if (checkLogSession(res, user))
  {
    axios.get(urlJoin(DB_BASE_URL, ''))
  }
  else
  {
    return makeAccessDeniedError()
  }
}

function checkLogSession(res, user) {
    /*
     * Check whether the signin session is expired or not
     */
}
