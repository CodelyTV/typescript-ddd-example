import cypress from 'cypress';
import { startBackofficeFrontend } from './startBackofficeFrontend';
import { startBackofficeBackend } from './startBackofficeBackend';
import { startMoocBackend } from './startMoocBackend';

async function open() {
  const backofficeFrontend = await startBackofficeFrontend();
  const backofficeBackend = await startBackofficeBackend();
  const moockBackend = await startMoocBackend();
  const port = backofficeFrontend.port;
  await runCypress(port);

  await Promise.all([backofficeFrontend.stop(), backofficeBackend.stop(), moockBackend]);
  process.exit(0);
}

async function runCypress(port: string) {
  return cypress.open({
    config: {
      supportFile: false,
      baseUrl: `http://localhost:${port}`
    }
  });
}

open();
