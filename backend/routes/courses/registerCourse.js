'use strict'

const { sendCourseRegistration } = require('../../services/courseService')

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
 * @route POST /api/courses/registerCourse
 * @group Courses
 * @param {CourseRequest.model} CourseRequest.body.required - the new course registration request
 * @returns {Course.model} 201 - A New Course object
 * @returns {ErrorResponse.model}  default - HttpError - Course not registered
 * @security JWT
 */
module.exports = async function (req, res, next) {
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

  const registered = await sendCourseRegistration(courseRequest, next)
  return res.status(201).json(registered)
}
