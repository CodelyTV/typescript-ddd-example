import { registerSubscribers } from './subscribers';
import { Server } from './server';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    await registerSubscribers();
    return this.server.listen();
  }

  async close() {
    return this.server?.stop();
  }
}
