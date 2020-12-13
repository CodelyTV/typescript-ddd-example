import assert from 'assert';
import { AfterAll, Before, Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../../../src/apps/backoffice/backend/app';
import container from '../../../../../../src/apps/backoffice/backend/config/dependency-injection';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be:', async response => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.deepStrictEqual(_response.body, expectedResponse);
});

Before(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');
  await (await environmentArranger).arrange();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Backoffice.Backend.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});
