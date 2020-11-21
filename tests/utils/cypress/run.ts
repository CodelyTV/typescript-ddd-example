import app from '../../../src/apps/backoffice/frontend/app';
import cypress from 'cypress';
import cypressConfig from '../../../cypress.json';
import { startBackofficeFrontend } from './startBackofficeFrontend';

async function run() {
  const server = await startBackofficeFrontend();
  await runCypress();
  server.close(() => {
    process.exit(0);
  });
}

async function runCypress() {
  return cypress.run({
    reporter: 'junit',
    browser: 'chrome',
    headless: true,
    config: {
      ...cypressConfig,
      supportFile: false,
      baseUrl: `http://localhost:${app.get('port')}`
    }
  });
}

run();
