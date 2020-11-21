import cypress from 'cypress';
import { startBackofficeFrontend } from './startBackofficeFrontend';
import app from '../../../src/apps/backoffice/frontend/app';

async function open() {
  const server = await startBackofficeFrontend();
  await openCypress();
  server.close(() => {
    process.exit(0);
  });
}

async function openCypress() {
  return cypress.open({
    config: {
      supportFile: false,
      baseUrl: `http://localhost:${app.get('port')}`
    }
  });
}

open();
