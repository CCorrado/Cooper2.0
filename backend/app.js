'use strict'

const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const expressSwagger = require('express-swagger-generator')(app)

// Parse JSON request bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(helmet())

// Set up routes
app.use(require('./routes'))

// Set up error handler
app.use(require('./middleware/errorHandler'))

const options = {
  swaggerDefinition: {
    info: {
      description: 'This is the API Documentation for the cooper Project',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:9000',
    basePath: '/',
    produces: [
      'application/json',
      'application/xml'
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, // app absolute path
  files: ['./routes/**/*.js'] // Path to the API handle folder
}

expressSwagger(options)

exports = module.exports = app
