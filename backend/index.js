'use strict'

const app = require('./app')
// eslint-disable-next-line import/order
const server = require('http').createServer(app)

const port = process.env.PORT || 9000

server.listen(port, function () {
  console.info(`Node HTTP server is listening on port ${port}`)
})
