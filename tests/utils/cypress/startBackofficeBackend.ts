import { BackofficeBackendApp } from '../../../src/apps/backoffice/backend/BackofficeBackendApp';

export async function startBackofficeBackend(): Promise<BackofficeBackendApp> {
  const app = new BackofficeBackendApp();
  await app.start();
  return app;
}
