'use strict'

const login = require('./users/loginUser')
const registration = require('./users/createUser')
const getUser = require('./users/getUser')

const router = require('express-promise-router')()
const category = require('./users/association/associateCategory')
const major = require('./users/association/associateMajor')
const range = require('./users/association/associateRange')
const institute = require('./users/association/associateInstitute')
const checkAccessToken = require('../middleware/checkAccessToken')

// const course = require('./courses/createCourse')

// User Routes
router.get('/users/getUser', checkAccessToken, getUser)
router.post('/users/register', registration)
router.post('/users/login', login)

router.post('/users/association/range', range.postRange)
router.post('/users/association/category', category.postCategory)
router.post('/users/association/major', major.postMajor)
router.post('/users/association/institute', institute.postInstitute)

// router.post('/courses/add', course.addCourse)
module.exports = router
