module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  setupFilesAfterEnv: [
    './tests/Contexts/Shared/infrastructure/Jest/toPublish.ts'
  ]
};
