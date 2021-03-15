import cypress from 'cypress';
import cypressConfig from '../../../cypress.json';
import { Applications } from './Applications';

async function run() {
  const port = await Applications.start();
  await runCypress(port);

  await Applications.stop();
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
