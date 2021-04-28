const config = require('./jest.config.js')
config.testMatch = [__dirname + '/tests/unit/**']
config.displayName = 'unit-tests'

module.exports = config
