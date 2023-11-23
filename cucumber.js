const common = [
  '--require-module ts-node/register', // Load TypeScript module
  '--require-module tsconfig-paths/register' // Load tsconfig.json paths
];

const mooc_backend = [
  ...common,
  'tests/apps/mooc/backend/features/**/*.feature',
  '--require tests/apps/mooc/backend/features/step_definitions/*.steps.ts'
].join(' ');

const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature',
  '--require tests/apps/backoffice/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
  mooc_backend,
  backoffice_backend
};
