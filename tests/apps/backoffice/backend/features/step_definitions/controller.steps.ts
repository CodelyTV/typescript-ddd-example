import assert from 'assert';
import { AfterAll, BeforeAll, Given, Then } from 'cucumber';
import request from 'supertest';
import { BackofficeBackendApp } from '../../../../../../src/apps/backoffice/backend/BackofficeBackendApp';
import container from '../../../../../../src/apps/backoffice/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;
let application: BackofficeBackendApp;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async response => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.deepStrictEqual(_response.body, expectedResponse);
});

BeforeAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');
  await (await environmentArranger).arrange();
  application = new BackofficeBackendApp();
  await application.start();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});
