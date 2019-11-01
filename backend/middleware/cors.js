'use strict'

const cors = require('cors')

const config = cors({
  origin: (origin, callback) => {
    return callback(null, true)
    // if (!origin || (env('ENV').toUpperCase() !== 'PROD' && whitelist.indexOf(origin) !== -1)) {
    //   return callback(null, true)
    // } else {
    //   const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
    //   return callback(new Error(msg), false)
    // }
  }
})

module.exports = config
