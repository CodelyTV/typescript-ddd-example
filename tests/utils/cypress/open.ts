import cypress from 'cypress';
import { startBackofficeFrontend } from './startBackofficeFrontend';
import frontendApp from '../../../src/apps/backoffice/frontend/app';
import { startBackofficeBackend } from './startBackofficeBackend';

async function open() {
  const backofficeFrontendServer = await startBackofficeFrontend();
  const backofficeBackendServer = await startBackofficeBackend();
  await openCypress();
  backofficeFrontendServer.close(() => {
    process.exit(0);
  });
  backofficeBackendServer.close(() => {
    process.exit(0);
  });
}

async function openCypress() {
  return cypress.open({
    config: {
      supportFile: false,
      baseUrl: `http://localhost:${frontendApp.get('port')}`
    }
  });
}

open();
