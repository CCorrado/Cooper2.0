'use strict'

const urlJoin = require('url-join')
const axios = require('axios')
const env = require('../../env')
const DB_BASE_URL = env('DB_BASE_URL')
const { HttpError } = require('../../errors')

/**
 * @typedef AddCourseReq
 * @property {[string]} title
 * @property {[string]} section
 * @property {[string]} minCredit
 * @property {[string]} maxCredit
 * @property {[string]} maxEnrollment
 * @property {[string]} currentEnrollment
 * @property {[string]} status
 * @property {[string]} startDate
 * @property {[string]} endDate
 * @property {[string]} startTime
 * @property {[string]} endTime
 * @property {[string]} instructor
 * @property {[string]} term
 * @property {[string]} meetingDay
 * @property {[string]} building
 * @property {[string]} room
 */

/**
 * @route POST /courses/add
 * @group courses - Create a new course
 * @param AddCourseReq.body.required
 * @returns 200
 * @returns {ErrorResponse.model}  default - HttpError
 */

function addCourse (req, res, next) {
  const CourseReq = {
    'title': req.body.title,
    'section': req.body.section,
    'minCredit': req.body.minCredit,
    'maxCredit': req.body.maxCredit,
    'maxEnrollment': req.body.maxEnrollment,
    'currentEnrollment': req.body.currentEnrollment,
    'status': req.body.status,
    'startDate': req.body.startDate,
    'endDate': req.body.endDate,
    'startTime': req.body.startTime,
    'endTime': req.body.endTime,
    'instructor': req.body.instructor,
    'term': req.body.term,
    'meetingDay': req.body.meetingDay,
    'building': req.body.building,
    'room': req.body.room
  }

  let newReq = CourseReq
  return axios.post(urlJoin(DB_BASE_URL, 'courses'), newReq)
    .then((response) => {
      return res.status(201)
    })
    .catch(() => {
      next(new HttpError(400, 'Could not create course'))
    })
}

module.exports = { addCourse }
