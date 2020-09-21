import app from '../src/apps/backoffice/frontend/app';
import cypress from 'cypress';
import { Server } from 'http';

async function run() {
  const server = await startServer();
  await runCypress();
  server.close(() => {
    process.exit(0);
  });
}

async function startServer(): Promise<Server> {
  let server: Server;

  return new Promise((resolve, reject) => {
    server = app.listen(app.get('port'), async () => {
      console.log(`  Backoffice frontend is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
      console.log('  Press CTRL-C to stop\n');
      resolve(server);
    });
  });
}

async function runCypress() {
  return cypress.run({
    reporter: 'junit',
    browser: 'chrome',
    headless: true,
    config: {
      baseUrl: `http://localhost:${app.get('port')}`,
      video: false
    }
  });
}

run();
