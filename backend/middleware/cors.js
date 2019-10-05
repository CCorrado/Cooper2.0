'use strict'

const cors = require('cors')
const env = require('../env')

const whitelist = ['http://localhost']

module.exports = cors({
  origin: (origin, callback) => {
    if (!origin || (env('ENV').toUpperCase() !== 'PROD' && whitelist.indexOf(origin) !== -1)) {
      return callback(null, true)
    } else {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
  }
})
