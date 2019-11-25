'use strict'

const axios = require('axios')
const urlJoin = require('url-join')

const { HttpError } = require('../../../errors')
const env = require('../../../env')
const DB_BASE_URL = env('DB_BASE_URL')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef SwapRequest
 * @property {[string]} swaperUserId -- the userId of the person initiating the swap
 * @property {[string]} courseToGiveId -- the course being offered up by the swaperUser
 * @property {[string]} courseToGetId -- the course desired by the swaperUser
 */

/**
 * @route GET /api/courses/swaps
 * @group Courses
 * @returns {SwapRequest.model} 200 - A list of SwapCourses
 * @returns {ErrorResponse.model}  default - HttpError - SwapCourses not found.
 * @security JWT
 */

module.exports = function (req, res, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'courses', 'swaps'))
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch(() => {
      return next(new HttpError(400, 'Failed to get Swap Course List'))
    })
}
