const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/app/**',
    '!<rootDir>/**/ports/*.ts',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/**/migrations/**',
    '!<rootDir>/**/config/**'
  ],
  testPathIgnorePatterns: ['<rootDir>/tests/unit/mocks/', '<rootDir>/tests/e2e/mocks/'],
  testMatch: [__dirname + '/tests/**/*.test.ts'],
  coverageDirectory: 'coverage/',
  coverageProvider: 'v8',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@t/(.*)': '<rootDir>/tests/$1'
  }
}
