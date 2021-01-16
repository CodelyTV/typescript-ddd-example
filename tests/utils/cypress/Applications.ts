import { BackofficeBackendApp } from '../../../src/apps/backoffice/backend/BackofficeBackendApp';
import { BackofficeFrontendApp } from '../../../src/apps/backoffice/frontend/BackofficeFrontendApp';
import { MoocBackendApp } from '../../../src/apps/mooc/backend/MoocBackendApp';

export class Applications {
  private static backofficeBackend: BackofficeBackendApp;
  private static backofficeFrontend: BackofficeFrontendApp;
  private static mooc: MoocBackendApp;

  static async start() {
    this.backofficeBackend = new BackofficeBackendApp();
    this.backofficeFrontend = new BackofficeFrontendApp();
    this.mooc = new MoocBackendApp();

    await this.mooc.start();
    await this.backofficeBackend.start();
    await this.backofficeFrontend.start();

    return this.backofficeFrontend.port;
  }

  static async stop() {
    await this.mooc.stop();
    await this.backofficeBackend.stop();
    await this.backofficeFrontend.stop();
  }
}
