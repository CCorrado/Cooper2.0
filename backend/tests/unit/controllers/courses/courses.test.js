/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')
const sinon = require('sinon')

describe('Assert Association Controllers are correct', () => {
  let app
  beforeEach(() => {
    app = importFresh('../../../../app')
  })

  afterEach(() => {
    sinon.restore()
    nock.cleanAll()
  })

  it('Should fail to create course', () => {
    nock('http://cooper-database-api:8080/').post('/courses/').delay(100)
      .reply(200, { 'course': { title: 'wrong' } })
    try {
      return request(app)
        .post('/courses/add')
        .expect(400, 'Could not create course')
    } catch (err) {
      assert(false, e.message)
    }
  })
})