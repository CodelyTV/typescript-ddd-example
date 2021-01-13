import { MoocBackendApp } from '../../../src/apps/mooc/backend/MoocBackendApp';

export async function startMoocBackend(): Promise<MoocBackendApp> {
  const app = new MoocBackendApp();
  await app.start();
  return app;
}
