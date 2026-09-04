module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/test/styleMock.cjs'
  },
  moduleFileExtensions: ['js', 'jsx', 'json']
}
