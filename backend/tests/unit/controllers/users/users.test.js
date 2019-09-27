/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const importFresh = require('import-fresh')
const request = require('supertest')
const nock = require('nock')

describe('Assert ', () => {
  let app

  beforeEach(() => {
    app = importFresh('../../../../app')
    nock('http://cooper-database-api:5432/').get('users/4').reply(200, { 'user': { id: '4' } })
  })

  it('Should fail to get user', () => {
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
})
