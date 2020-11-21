import assert from 'assert';
import { AfterAll, Before, Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../../src/apps/mooc_backend/app';
import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { EnvironmentArranger } from '../../../../Contexts/Shared/infrastructure/arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(app).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(app).put(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepEqual(_response.body, JSON.parse(response));
});

Before(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
  await (await environmentArranger).arrange();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Mooc.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});
