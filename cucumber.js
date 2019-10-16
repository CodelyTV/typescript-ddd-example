let common = [
  'tests/**/features/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require tests/**/features/*.steps.ts' // Load step definitions
].join(' ');

module.exports = {
  default: common
};
