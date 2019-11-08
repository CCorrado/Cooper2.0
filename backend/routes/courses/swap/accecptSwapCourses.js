'use strict'

const axios = require('axios')
const urlJoin = require('url-join')

const { HttpError } = require('../../../errors')
const env = require('../../../env')
const { getCoursesForUser, unregisterFromCourse, sendCourseRegistration, getAllCourses } = require('../../../services/courseService')
const DB_BASE_URL = env('DB_BASE_URL')
const courseList = require('../../../data/stevens_courses')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef acceptSwapRequest
 * @property {[string]} courseSwapId -- the courseSwapId of this swap session
 * @property {[string]} swapeeUserId -- the userId of swapee
 * @property {[string]} swaperUserId -- the userId of swaper
 * @property {[string]} courseToGetId -- the course section desired by the swaperUser
 * @property {[string]} courseToGiveId -- the course section being offered up by the swaperUser
 * @property {[string]} swapeeAccept -- the status of this swap
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
 * @route POST /api/courses/swaps/accept
 * @group Courses
 * @param {acceptSwapRequest.model} acceptSwapRequest.body.required - A swap req contains userId and courseToGiveId, courseGetId, swapeeAccept
 * @return {CourseSwapResponse.model} 201 - Accept successfully
 * @return {ErrorResponse.model}  default - HttpError - Swap cannot created
 * @security JWT
 */

module.exports = async function (req, res, next) {
  const swapReq = {
    'courseSwapId': req.body.courseSwapId,
    'swapeeUserId': req.body.swapeeUserId,
    'swaperUserId': req.body.swaperUserId,
    'courseToGetId': req.body.courseToGetId,
    'courseToGiveId': req.body.courseToGiveId,
    'swapeeAccept': req.body.swapeeAccept
  }

  const userId = req.cooper.userId

  if (!userId || swapReq.swapeeUserId !== userId) {
    return next(new HttpError(400, 'Cannot accept swap on behalf of another user'))
  }

  if (!swapReq.courseToGiveId || !swapReq.courseToGetId) {
    return next(new HttpError(400, 'courseToGiveId and courseToGetId are required parameters'))
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

  if (matchingCourseToGive) {
    return next(new HttpError(400, 'Cannot accept swap for a course already registered for'))
  }

  if (!matchingCourseToGet) {
    return next(new HttpError(400, 'Cannot accept a swap for a course this user cannot offer'))
  }

  return axios.post(urlJoin(DB_BASE_URL, 'courses', 'swaps', 'accept'), swapReq)
    .then(async () => {
      const swaperCourseToRegister = getAllCourses('', swapReq.courseToGetId, courseList)
      const swapeeCourseToRegister = getAllCourses('', swapReq.courseToGiveId, courseList)
      await unregisterUserFromCourse(next, swapReq.swapeeUserId, matchingCourseToGet)
      await unregisterUserFromCourse(next, swapReq.swaperUserId, matchingCourseToGive)
      await registerUserForCourse(next, swapReq.swapeeUserId, swapeeCourseToRegister[0])
      await registerUserForCourse(next, swapReq.swaperUserId, swaperCourseToRegister[0])
    })
    .catch(() => {
      return next(new HttpError(400, 'Cannot complete course swap without swaperUserId and swapeeUserId parameter set.'))
    })
}

async function unregisterUserFromCourse (next, userId, courseToUnregister) {
  const unregistered = await unregisterFromCourse(userId, courseToUnregister.courseId, next)
  return unregistered
}

async function registerUserForCourse (next, userId, courseToRegister) {
  const newCourse = { ...courseToRegister, userId }
  const registered = await sendCourseRegistration(newCourse, next)
  return registered
}
