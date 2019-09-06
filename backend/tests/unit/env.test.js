/* eslint-env mocha */

'use strict'

const { assert } = require('chai')
const fs = require('fs')
const path = require('path')
const importFresh = require('import-fresh')
const { EnvInitializationError } = require('../../../errors')

describe('Environment Initialization', () => {
  it('Should Successfully initialize', () => {
    try {
      const env = importFresh('../../../env')
      env('MY_ENV_VAR', 'my string value')
      assert(env('MY_ENV_VAR') === 'my string value')
    } catch (e) {
      assert(false, e.message)
    }
  })

  it('Should Fail To Initialize If File Does Not Exist', () => {
    const envPath = path.resolve(__dirname, '../../../.env')
    fs.renameSync(envPath, envPath + '.moved')
    try {
      importFresh('../../../env')
      assert(false)
    } catch (error) {
      assert(error instanceof EnvInitializationError)
    }
    fs.renameSync(envPath + '.moved', envPath)
  })
})
