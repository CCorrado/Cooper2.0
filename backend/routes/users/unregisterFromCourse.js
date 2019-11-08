'use strict'

const { unregisterFromCourse } = require('../../services/courseService')

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
