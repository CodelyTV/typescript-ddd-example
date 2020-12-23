import { registerSubscribers } from './subscribers';
import { Server } from './server';

export class Application {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '3000';
    this.server = new Server(port);
    await registerSubscribers();
    return this.server.listen();
  }
}
