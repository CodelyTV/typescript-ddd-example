const tsconfig = require('./tsconfig.json')
const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig)


module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  moduleNameMapper
};
