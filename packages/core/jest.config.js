module.exports = {
  testMatch: [
    '**/packages/**/test/*.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'lcov',
    'text',
    'html'
  ],
  collectCoverageFrom: [
    'packages/**/src/*.js',
    '!packages/docs/**/*.js'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  setupFilesAfterEnv: [],
  snapshotSerializers: [
    'jest-emotion'
  ]
};
