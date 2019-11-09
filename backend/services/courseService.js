'use strict'

const axios = require('axios')
const urlJoin = require('url-join')

const { HttpError } = require('../errors')

const env = require('../env')
const DB_BASE_URL = env('DB_BASE_URL')

function unregisterFromCourse (userId, courseId, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'courses', courseId, 'users', userId, 'unregister'))
    .then(function (response) {
      return response
    })
    .catch(() => {
      next(new HttpError(400, 'Failed to unregister the course for the user'))
    })
}

function getCoursesForUser (userId, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'courses', userId))
    .then(function (response) {
      return response.data
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to get courses for the user'))
    })
}

function sendCourseRegistration (course, next) {
  // Save this user to the database
  return axios.post(urlJoin(DB_BASE_URL, 'course/register'), course)
    .then(function (response) {
      return {
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
      }
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to register the user for the course'))
    })
}

function getAllCourses (name, number, courseList) {
  let returnCourses = []
  if (name) {
    courseList.map(course => {
      if (course.title.replace(/\s+/g, '').includes(name.replace(/\s+/g, ''))) {
        returnCourses.push(course)
      }
    })
    return returnCourses
  }

  if (number) {
    let returnCourses = []
    courseList.map(course => {
      if (course.section.replace(/\s+/g, '').includes(number.replace(/\s+/g, ''))) {
        returnCourses.push(course)
      }
    })
    return returnCourses
  }

  return courseList
}

module.exports = { unregisterFromCourse, getCoursesForUser, sendCourseRegistration, getAllCourses }
