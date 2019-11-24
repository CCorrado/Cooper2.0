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
 * @route GET /api/users/courses/unregister
 * @group users
 * @param {string} userId.query.required - The ID of the user desired
 * @param {int} courseId.query.required - The ID of the course to unregister from
 * @returns {Course.model} 200 - A List of Courses registered by the user
 * @returns {ErrorResponse.model}  default - HttpError - Course not registered
 * @security JWT
 */
module.exports = function (req, res, next) {
  const { userId, courseId } = req.query
  return unregisterFromCourse(res, userId, courseId, next)
}

function unregisterFromCourse (res, userId, courseId, next) {
  return axios.get(urlJoin(DB_BASE_URL, 'courses', courseId, 'users', userId, 'unregister'))
    .then(function (response) {
      return res.send(response)
    })
    .catch(function () {
      next(new HttpError(400, 'Failed to unregister the course for the user'))
    })
}
