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
 * @typedef SwapeeRequest
 * @property {[string]} swapeeUserId -- the userId of the person initiating the swap
 * @property {[string]} courseToGiveId -- the course being offered up by the swaperUser
 * @property {[string]} courseToGetId -- the course desired by the swaperUser
 * @property {[string]} swapeeAccept -- status of swapee
 */

/**
 * @typedef CourseSwapResponse
 * @property {[string]} courseSwapId -- the primary key (ID) of this swap
 * @property {[string]} courseToGetId -- the course desired by the swaperUser
 * @property {[string]} courseToGiveId -- the course being offered up by the swaperUser
 * @property {[string]} createdDate -- Create date of this session
 * @property {[string]} swapCompleted -- status of whether swapped or not
 * @property {[string]} swapeeAccept -- status of swapee
 * @property {[string]} swapeeUserId -- swapee user id
 * @property {[string]} swaperUserId -- swaper user id
 */

/**
 * @route GET /courses/swaps
 * @group Courses
 * @returns {SwapRequest.model} 200 - A list of SwapCourses
 * @returns {ErrorResponse.model}  default - HttpError - SwapCourses not found.
 */

module.exports = function (req, res, next) {
  const swapReq = {
    'userId': req.body.userId,
    'courseToGiveId': req.body.courseToGiveId,
    'courseToGetId': req.body.courseToGetId
  }
  return axios.post(urlJoin(DB_BASE_URL, 'courses', 'swap', 'accept'), swapReq)
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch(() => {
      return next(new HttpError(400, "Cannot complete course swap without swaperUserId and swapeeUserId parameter set."))
    })
}