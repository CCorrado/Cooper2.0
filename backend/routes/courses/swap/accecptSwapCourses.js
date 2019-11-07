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
 * @typedef acceptSwapRequest
 * @property {[string]} courseSwapId -- the courseSwapId of this swap session
 * @property {[string]} swapeeUserId -- the userId of swapee
 * @property {[string]} swapeeAccept -- the status of this swap
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
 * @route POST /courses/swaps/accept
 * @group Courses
 * @param {acceptSwapRequest.model} acceptSwapRequest.body.required - A swap req contains userId and courseToGiveId, courseGetId, swapeeAccept
 * @return {CourseSwapResponse.model} 201 - Accept successfully
 * @return {ErrorResponse.model}  default - HttpError - Swap cannot created
 * @security JWT
 */

module.exports = function (req, res, next) {
  const swapReq = {
    'courseSwapId': req.body.courseSwapId,
    'swapeeUserId': req.body.swapeeUserId,
    'swapeeAccept': req.body.swapeeAccept
  }
  return axios.post(urlJoin(DB_BASE_URL, 'courses', 'swaps', 'accept'), swapReq)
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch(() => {
      return next(new HttpError(400, 'Cannot complete course swap without swaperUserId and swapeeUserId parameter set.'))
    })
}
