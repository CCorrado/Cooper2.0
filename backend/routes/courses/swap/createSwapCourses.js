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
 * @property {[string]} courseToGiveId -- the course section being offered up by the swaperUser
 * @property {[string]} courseToGetId -- the course section desired by the swaperUser
 */

/**
 * @typedef CourseSwapResponse
 * @property {[string]} courseSwapId -- the primary key (ID) of this swap
 * @property {[string]} courseToGetId -- the course section desired by the swaperUser
 * @property {[string]} courseToGiveId -- the course section being offered up by the swaperUser
 * @property {[string]} createdDate -- Create date of this session
 * @property {[string]} swapCompleted -- status of whether swapped or not
 * @property {[string]} swapeeAccept -- status of swapee
 * @property {[string]} swapeeUserId -- swapee user id
 * @property {[string]} swaperUserId -- swaper user id
 */

/**
 * @route POST /api/courses/swaps/create
 * @group Courses
 * @param {SwapCourses.model} SwapCourses.body.required - A swap req contains userId and courseToGiveId, courseGetId
 * @return {CourseSwapResponse.model} 201 - Create successfully
 * @return {ErrorResponse.model}  default - HttpError - Swap cannot created
 * @security JWT
 */

module.exports = async function (req, res, next) {
  const swapReq = {
    'swaperUserId': req.body.swaperUserId,
    'courseToGiveId': req.body.courseToGiveId,
    'courseToGetId': req.body.courseToGetId
  }
  const userId = req.cooper.userId

  if (!userId || swapReq.swaperUserId !== userId) {
    return next(new HttpError(400, 'Cannot create swap for a different user'))
  }

  const userCourses = await getCoursesForUser(userId, next)
  let matchingCourseToGive
  let matchingCourseToGet

  if (userCourses && userCourses.length) {
    userCourses.map(course => {
      if (course.section === swapReq.courseToGetId) {
        matchingCourseToGet = course
      }

      if (course.section === swapReq.courseToGiveId) {
        matchingCourseToGive = course
      }
    })
  } else {
    next(new HttpError(400, 'Failed to get any courses for the user'))
  }

  if (!matchingCourseToGive) {
    return next(new HttpError(400, 'Cannot create swap for a course not currently registered'))
  }

  if (matchingCourseToGet) {
    return next(new HttpError(400, 'Cannot request swap for a course already registered for'))
  }

  return axios.post(urlJoin(DB_BASE_URL, 'courses', 'swaps', 'create'), swapReq)
    .then((response) => {
      return res.status(200).json(response.data)
    })
    .catch((err) => {
      return next(new HttpError(400, err))
    })
}
