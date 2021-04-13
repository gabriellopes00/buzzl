const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/core/*.ts',
    '!<rootDir>/**/ports/*.ts',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/**/config/*.ts'
  ],
  testPathIgnorePatterns: ['<rootDir>/tests/unit/mocks/'],
  coverageDirectory: 'coverage/',
  coverageProvider: 'v8',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
