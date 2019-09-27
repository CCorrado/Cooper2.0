'use strict'

const router = require('express-promise-router')()
const category = require('./users/association/associateCategory')
const major = require('./users/association/associateMajor')
const range = require('./users/association/associateRange')
const institute = require('./users/association/associateInstitute')
const checkAccessToken = require('../middleware/checkAccessToken')

// User Routes
router.use('/users/getUser', checkAccessToken, require('./users/getUser'))
router.use('/users/register', require('./users/createUser'))
router.use('/users/login', require('./users/loginUser'))

router.post('/users/association/range', range.postRange)
router.post('/users/association/category', category.postCategory)
router.post('/users/association/major', major.postMajor)
router.post('/users/association/institute', institute.postInstitute)

module.exports = router
