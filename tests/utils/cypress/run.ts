import cypress from 'cypress';
import cypressConfig from '../../../cypress.json';
import { startBackofficeFrontend } from './startBackofficeFrontend';
import { startBackofficeBackend } from './startBackofficeBackend';
import { startMoocBackend } from './startMoocBackend';

async function run() {
  const moockBackend = await startMoocBackend();
  const backofficeFrontend = await startBackofficeFrontend();
  const backofficeBackend = await startBackofficeBackend();
  const port = backofficeFrontend.port;
  await runCypress(port);

  await Promise.all([backofficeFrontend.stop(), backofficeBackend.stop(), moockBackend]);
  process.exit(0);
}

async function runCypress(port: string) {
  return cypress.run({
    reporter: 'junit',
    browser: 'chrome',
    headless: true,
    config: {
      ...cypressConfig,
      supportFile: false,
      baseUrl: `http://localhost:${port}`
    }
  });
}

run();
