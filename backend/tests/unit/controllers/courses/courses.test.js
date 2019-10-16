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
})