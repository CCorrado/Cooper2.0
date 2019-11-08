'use strict'

const { HttpError } = require('../../errors')

const courseList = require('../../data/stevens_courses')

const { getAllCourses } = require('../../services/courseService')

/**
 * @typedef ErrorResponse
 * @property {[integer]} statusCode
 * @property {[string]} message
 */

/**
 * @typedef Course
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
 * @route GET /api/courses
 * @group Courses
 * @param {string} name.query - The Course Name
 * @param {string} number.query - The Course number
 * @returns {Course.model} 200 - A List of Course objects
 * @returns {ErrorResponse.model}  default - HttpError - User not found
 * @security JWT
 */
module.exports = function (req, res, next) {
  const { name, number } = req.query
  try {
    const courses = getAllCourses(name, number, courseList)
    return res.status(200).json(courses)
  } catch (e) {
    next(new HttpError(400, 'Failed to find any courses'))
  }
}
