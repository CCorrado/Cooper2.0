'use strict'

const axios = require('axios')
const urlJoin = require('url-join')

const { HttpError } = require('../../errors')
const env = require('../../env')
const DB_BASE_URL = env('DB_BASE_URL')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef CourseResponse
 * @property {[string]} userId
 * @property {[number]} courseId
 * @property {[string]} title
 * @property {[string]} section
 * @property {[string]} call_number
 * @property {[string]} minCredit
 * @property {[string]} maxCredit
 * @property {[string]} maxEnrollment
 * @property {[string]} currentEnrollment
 * @property {[string]} status
 * @property {[string]} startDate
 * @property {[string]} endDate
 * @property {[string]} instructor
 * @property {[string]} term
 * @property {[string]} meetingDay
 * @property {[string]} startTime
 * @property {[string]} endTime
 * @property {[string]} building
 * @property {[string]} room
 */

/**
 * @route GET /api/users/courses
 * @group users
 * @param {string} userId.query.required - The ID of the user desired
 * @returns {Course.model} 200 - A List of Courses registered by the user
 * @returns {ErrorResponse.model}  default - HttpError - Course not registered
 * @security JWT
 */
module.exports = function (req, res, next) {
  const { userId } = req.query
  return getCoursesForUser(res, userId, next)
}

function getCoursesForUser (res, userId, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'courses', userId))
    .then(function (response) {
      return res.send(response.data)
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to get courses for the user'))
    })
}
