import app from '../../../src/apps/backoffice/backend/app';
import { Server } from 'http';

export async function startBackofficeBackend(): Promise<Server> {
  let server: Server;

  return new Promise((resolve, reject) => {
    server = app.listen(app.get('port'), async () => {
      console.log(`  Backoffice backend is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
      console.log('  Press CTRL-C to stop\n');
      resolve(server);
    });
  });
}
