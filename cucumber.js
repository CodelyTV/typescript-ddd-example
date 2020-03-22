let common = [
  'tests/**/features/**/*.feature', // Specify our feature files
  '--require-module ts-node/register', // Load TypeScript module
  '--require tests/**/features/step_definitions/*.steps.ts' // Load step definitions
].join(' ');

module.exports = {
  default: common
};
