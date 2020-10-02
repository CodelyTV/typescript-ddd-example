import cypress from 'cypress';
import { startBackofficeFrontend } from './startBackofficeFrontend';

async function open() {
  const server = await startBackofficeFrontend();
  await openCypress();
  server.close(() => {
    process.exit(0);
  });
}

async function openCypress() {
  return cypress.open();
}

open();
