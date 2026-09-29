'use strict'
const mockEnv = require('./mock-env')

module.exports = {
  NODE_ENV: '"production"',
  ...mockEnv('production')
}
