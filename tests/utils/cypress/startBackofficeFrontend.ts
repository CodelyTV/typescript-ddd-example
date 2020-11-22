import app from '../../../src/apps/backoffice/frontend/app';
import { Server } from 'http';

export async function startBackofficeFrontend(): Promise<Server> {
  let server: Server;

  return new Promise((resolve, reject) => {
    server = app.listen(app.get('port'), async () => {
      console.log(`  Backoffice frontend is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
      console.log('  Press CTRL-C to stop\n');
      resolve(server);
    });
  });
}
