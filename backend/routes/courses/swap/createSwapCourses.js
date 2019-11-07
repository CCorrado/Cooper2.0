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
 * @route POST /courses/swaps/create
 * @group Courses
 * @param {SwapCourses.model} SwapCourses.body.required - A swap req contains userId and courseToGiveId, courseGetId
 * @return {CourseSwapResponse.model} 201 - Create successfully
 * @return {ErrorResponse.model}  default - HttpError - Swap cannot created
 * @security JWT
 */

module.exports = function (req, res, next) {
  const swapReq = {
    'swaperUserId': req.body.swaperUserId,
    'courseToGiveId': req.body.courseToGiveId,
    'courseToGetId': req.body.courseToGetId
  }
  return axios.post(urlJoin(DB_BASE_URL, 'courses', 'swaps', 'create'), swapReq)
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch((err) => {
      return next(new HttpError(400, err))
    })
}