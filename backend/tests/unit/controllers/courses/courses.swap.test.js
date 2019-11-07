/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')

describe('Assert CourseSwap controller functions normally', () => {
  let app

  beforeEach(() => {
    app = importFresh('../../../../app')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('Should fail to return courses to user', () => {
    try {
      return request(app).get('/api/courses/swaps').expect(401)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should successfully return swap course list to the user', () => {
    try {
      return request(app).get('/api/courses/swaps').expect(200)
    } catch (e) {
      assert(false, e.message)
    }
  })
})
