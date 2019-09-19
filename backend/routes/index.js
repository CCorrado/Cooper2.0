'use strict'

const router = require('express-promise-router')()

const checkAccessToken = require('../middleware/checkAccessToken')

// User Routes
router.use('/users/getUser', checkAccessToken, require('./users/getUser'))
router.use('/users/register', require('./users/createUser'))
router.use('/users/login', require('./users/loginUser'))
router.use('/users/association/associate_range', require('./users/association/associate_range'))
router.use('/users/association/associate_category', require('./users/association/associate_category'))
router.use('/users/association/associate_major', require('./users/association/associate_major'))
router.use('/users/association/associate_insititute', require('./users/association/associate_insititute'))

module.exports = router
