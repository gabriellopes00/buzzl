const config = require('./jest.config.js')
config.testMatch = ['**/*.test.ts']
config.displayName = 'e2e-tests'

module.exports = config
