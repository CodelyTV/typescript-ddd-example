import cypress from 'cypress';
import { Applications } from './Applications';

async function open() {
  const port = await Applications.start();
  await runCypress(port);

  await Applications.stop();
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
