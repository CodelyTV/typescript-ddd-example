import { Server } from './server';
import { seed } from './seed';

export class BackofficeFrontendApp {
  private server?: Server;

  async start() {
    const port = process.env.PORT || '8032';
    this.server = new Server(port);
    await seed();
    return this.server.listen();
  }

  async stop() {
    await this.server?.stop();
  }

  get port(): string {
    if (!this.server) {
      throw new Error('Backoffice frontend application has not been started');
    }
    return this.server.port;
  }
}
