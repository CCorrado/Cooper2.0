/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')

describe('Assert Association Controllers are correct', () => {
  let app
  beforeEach(() => {
    app = importFresh('../../../../app')
  })

  it('Should Successfully post Major', () => {
    try {
      return request(app)
        .post('/api/users/association/major')
        .expect(201, { 'message': 'success' })
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should Successfully post Institute', () => {
    try {
      return request(app)
        .post('/api/users/association/institute')
        .expect(201, { 'message': 'success' })
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should Successfully post Category', () => {
    try {
      return request(app)
        .post('/api/users/association/category')
        .expect(201, { 'message': 'success' })
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should Successfully post Range', () => {
    try {
      return request(app)
        .post('/api/users/association/range')
        .expect(201, { 'message': 'success' })
    } catch (e) {
      assert(false, e.message)
    }
  })
})
