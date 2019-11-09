'use strict'

const { unregisterFromCourse } = require('../../services/courseService')
const { HttpError } = require('../../errors')
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
module.exports = async function (req, res, next) {
  const { userId, courseId } = req.query

  if (req.cooper.userId !== userId) {
    return next(new HttpError(400, 'Cannot unregister a different user for a course'))
  }

  const resp = await unregisterFromCourse(userId, courseId, next)
  return res.send(resp)
}
