import { registerSubscribers } from './subscribers';
import { Server } from './server';

export class Application {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    await registerSubscribers();
    return this.server.listen();
  }

  get httpServer() {
    if (this.server) {
      return this.server.getHTTPServer();
    }
  }
}
