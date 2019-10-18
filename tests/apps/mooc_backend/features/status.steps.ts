import { Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../src/apps/mooc_backend/app';

let statusRoute: string;

Given('I send a GET request to {string}', (route: string) => {
  statusRoute = route;
});

Then('the response code should be {int}', async (code: number) => {
  await request(app)
    .get(statusRoute)
    .expect(code);
});
