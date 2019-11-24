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
 * @typedef CourseRequest
 * @property {[string]} userId
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
 * @route POST /api/courses/register
 * @group Courses
 * @param {CourseRequest.model} CourseRequest.body.required - the new course registration request
 * @returns {Course.model} 201 - A New Course object
 * @returns {ErrorResponse.model}  default - HttpError - Course not registered
 * @security JWT
 */
module.exports = function (req, res, next) {
  const courseRequest = {
    'userId': req.body.userId,
    'title': req.body.title,
    'section': req.body.section,
    'call_number': req.body.role,
    'minCredit': req.body.minCredit,
    'maxCredit': req.body.maxCredit,
    'maxEnrollment': req.body.maxEnrollment,
    'currentEnrollment': req.body.currentEnrollment,
    'status': req.body.status,
    'startDate': req.body.startDate,
    'endDate': req.body.endDate,
    'instructor': req.body.instructor,
    'term': req.body.term,
    'meetingDay': req.body.meetingDay,
    'startTime': req.body.startTime,
    'endTime': req.body.endTime,
    'building': req.body.building,
    'room': req.body.room
  }

  return sendCourseRegistration(res, courseRequest, next)
}

function sendCourseRegistration (res, course, next) {
  // Save this user to the database
  return axios.post(urlJoin(DB_BASE_URL, 'course/register'), course)
    .then(function (response) {
      return res.status(201).json({
        'userId': response.data.userId,
        'courseId': response.data.courseId,
        'title': response.data.title,
        'section': response.data.section,
        'call_number': response.data.role,
        'minCredit': response.data.minCredit,
        'maxCredit': response.data.maxCredit,
        'maxEnrollment': response.data.maxEnrollment,
        'currentEnrollment': response.data.currentEnrollment,
        'status': response.data.status,
        'startDate': response.data.startDate,
        'endDate': response.data.endDate,
        'instructor': response.data.instructor,
        'term': response.data.term,
        'meetingDay': response.data.meetingDay,
        'startTime': response.data.startTime,
        'endTime': response.data.endTime,
        'building': response.data.building,
        'room': response.data.room
      })
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to register the user for the course'))
    })
}
