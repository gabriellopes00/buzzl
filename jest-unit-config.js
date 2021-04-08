const config = require('./jest.config.js')
config.testMatch = ['**/*.spec.ts']
config.displayName = 'unit-tests'

module.exports = config
