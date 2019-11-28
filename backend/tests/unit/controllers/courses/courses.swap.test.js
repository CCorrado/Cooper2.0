/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Assert CourseSwap controller functions normally', () => {
  let app

  beforeEach(() => {
    app = importFresh('../../../../app')
    sinon.stub(bcrypt, 'hashSync').returns('superSecretPassword')
    sinon.stub(bcrypt, 'compareSync').returns(true)
    sinon.stub(jwt, 'verify').returns('someUniqueToken')
  })

  afterEach(() => {
    sinon.restore()
    nock.cleanAll()
  })

  it('Should fail to authorize', () => {
    try {
      return request(app).get('/api/courses/swaps').expect(401)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should fail to return course list', () => {
    try {
      return request(app).get('/api/courses/swaps').set('Authorization', 'Bearer someUniqueToken').expect(400)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should successfully return swap course list to the user', () => {
    nock('http://cooper-database-api:8080/').get('/courses/swaps').delay(100).reply(200, [
      {
        'courseSwapId': '0',
        'courseToGetId': 'SSW695',
        'courseToGiveId': 'SSW690',
        'createdDate': '2019/11/08',
        'swapCompleted': 'completed',
        'swapeeAccept': 'accepted',
        'swapeeUserId': '0',
        'swaperUserId': '1'
      }
    ])
    try {
      return request(app).get('/api/courses/swaps').set('Authorization', 'Bearer someUniqueToken').expect(200)
    } catch (e) {
      assert(false, e.message)
    }
  })

  /*
   * Course Accept Test
   */
  it('Should failed to get course due to GetID === GiveID', () => {
    let body = {
      'courseSwapId': '0',
      'courseToGetId': 'SSW695',
      'courseToGiveId': 'SSW695',
      'swapeeAccept': 'accepted',
      'swapeeUserId': '0',
      'swaperUserId': '1'
    }
    let cooper = {
      'userId': '2'
    }
    let req = {
      body,
      req
    }
    try {
      return request(app)
        .post('/api/courses/swaps/accept')
        .send(req)
        .set('Authorization', 'Bearer someUniqueToken')
        .expect(400, 'Cannot accept swap on behalf of another user')
    } catch (err) {
      assert(false, err.message)
    }
  })
})
