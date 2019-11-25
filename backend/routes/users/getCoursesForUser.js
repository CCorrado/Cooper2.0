'use strict'

const { getCoursesForUser } = require('../../services/courseService')

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
module.exports = async function (req, res, next) {
  const { userId } = req.query
  const userCourses = await getCoursesForUser(userId, next)
  return res.status(200).json(userCourses)
}
