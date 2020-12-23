import { registerSubscribers } from './subscribers';
import { Server } from './server';
import { seed } from './seed';

export class Application {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '8032';
    this.server = new Server(port);
    await registerSubscribers();
    await seed();
    return this.server.listen();
  }
}
