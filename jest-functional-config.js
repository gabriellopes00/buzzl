const config = require('./jest.config.js')
config.testMatch = ['**/*.test.ts']
config.displayName = 'functional-tests'

module.exports = config
