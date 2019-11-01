/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')
const sinon = require('sinon')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Assert Course controller functions normally', () => {
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

  it('Should fail to return courses to the user', () => {
    try {
      return request(app).get('/api/courses').expect(401)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should successfully return courses to the user', () => {
    try {
      return request(app).get('/api/courses').set('Authorization', 'Bearer someUniqueToken').expect(200)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should successfully return courses to the user for query name', () => {
    try {
      return request(app).get('/api/courses?name=Special').set('Authorization', 'Bearer someUniqueToken').expect(200)
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should successfully return courses to the user for query number', () => {
    try {
      return request(app).get('/api/courses?name=SSW').set('Authorization', 'Bearer someUniqueToken').expect(200)
    } catch (e) {
      assert(false, e.message)
    }
  })
})
