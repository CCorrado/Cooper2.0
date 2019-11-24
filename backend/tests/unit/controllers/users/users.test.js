/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Assert User controller functions normally', () => {
  let app

  beforeEach(() => {
    app = importFresh('../../../../app')
  })

  afterEach(() => {
    sinon.restore()
    nock.cleanAll()
  })

  it('Should fail to get user', () => {
    nock('http://cooper-database-api:8080/').get('/users/4').delay(100).reply(200, { 'user': { id: '4' } })
    try {
      return request(app)
        .get('/users/getUser')
        .query('4')
        .expect(401, {
          'error': 'access_denied',
          'message': 'Authorization Denied. Have you tried refreshing your access token?'
        })
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should login the user', () => {
    nock('http://cooper-database-api:8080/').get('/users?username=john@doe.com').reply(200, {
      'username': 'john@doe.com',
      'password': 'superSecretPassword',
      'name': 'John Doe',
      'role': 'student',
      'accessToken': 'someUniqueToken',
      'tokenType': 'bearer',
      'expiresIn': 86400,
      'refreshToken': 'someUniqueToken'
    })

    nock('http://cooper-database-api:8080/').post('/users/newSession').reply(201, {
      'username': 'john@doe.com',
      'password': 'superSecretPassword',
      'name': 'John Doe',
      'role': 'student',
      'accessToken': 'someUniqueToken',
      'tokenType': 'bearer',
      'expiresIn': 86400,
      'refreshToken': 'someUniqueToken'
    })

    sinon.stub(bcrypt, 'hashSync').returns('superSecretPassword')
    sinon.stub(bcrypt, 'compareSync').returns(true)
    sinon.stub(jwt, 'verify').returns('someUniqueToken')
    try {
      return request(app)
        .post('/users/login').send({
          'username': 'john@doe.com',
          'password': 'Test1234'
        })
        .expect(201, {
          'username': 'john@doe.com',
          'name': 'John Doe',
          'role': 'student',
          'accessToken': 'someUniqueToken',
          'tokenType': 'bearer',
          'expiresIn': 86400,
          'refreshToken': 'someUniqueToken'
        })
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should register the user', () => {
    nock('http://cooper-database-api:8080/').post('/users').reply(201, {
      'username': 'john@doe.com',
      'password': 'superSecretPassword',
      'name': 'John Doe',
      'role': 'student',
      'accessToken': 'someUniqueToken',
      'tokenType': 'bearer',
      'expiresIn': 86400,
      'refreshToken': 'someUniqueToken'
    })

    sinon.stub(bcrypt, 'hashSync').returns('superSecretPassword')
    sinon.stub(bcrypt, 'compareSync').returns(true)
    sinon.stub(jwt, 'sign').returns('someUniqueToken')
    try {
      return request(app)
        .post('/users/register').send({
          'username': 'john@doe.com',
          'password': 'Test1234',
          'name': 'John Doe',
          'role': 'student'
        })
        .expect(201, {
          'username': 'john@doe.com',
          'name': 'John Doe',
          'role': 'student',
          'accessToken': 'someUniqueToken',
          'tokenType': 'bearer',
          'expiresIn': 86400,
          'refreshToken': 'someUniqueToken'
        })
    } catch (e) {
      assert(false, e.message)
    }
  })
})
