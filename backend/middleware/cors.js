'use strict'

const cors = require('cors')

const config = cors({
  origin: (origin, callback) => {
    return callback(null, true)
  }
})

module.exports = config
