import frontendApp from '../../../src/apps/backoffice/frontend/app';
import cypress from 'cypress';
import cypressConfig from '../../../cypress.json';
import { startBackofficeFrontend } from './startBackofficeFrontend';
import { startBackofficeBackend } from './startBackofficeBackend';

async function run() {
  const backofficeFrontendServer = await startBackofficeFrontend();
  const backofficeBackendServer = await startBackofficeBackend();
  await runCypress();
  backofficeFrontendServer.close(() => {
    process.exit(0);
  });
  backofficeBackendServer.close(() => {
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
      baseUrl: `http://localhost:${frontendApp.get('port')}`
    }
  });
}

run();
