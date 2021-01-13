import { BackofficeFrontendApp } from '../../../src/apps/backoffice/frontend/BackofficeFrontendApp';

export async function startBackofficeFrontend(): Promise<BackofficeFrontendApp> {
  const app = new BackofficeFrontendApp();
  await app.start();
  return app;
}
