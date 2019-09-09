'use strict'

const router = require('express-promise-router')()

const checkAccessToken = require('../middleware/checkAccessToken')

// User Routes
router.use('/users/getUser', checkAccessToken, require('./users/getUser'))
router.use('/users/register', require('./users/createUser'))
router.use('/users/login', require('./users/loginUser'))

module.exports = router
