const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {
  rootDir: root,
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/main/*.ts',
    '!<rootDir>/**/config/*.ts'
  ],
  coverageDirectory: 'coverage/',
  coverageProvider: 'v8',
  clearMocks: true,
  preset: 'ts-jest',
  // preset: '@shelf/jest-mongodb', <== if using mongodb in memory database
  // transform: {
  //   '.+\\.ts$': 'ts-jest'
  // },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
