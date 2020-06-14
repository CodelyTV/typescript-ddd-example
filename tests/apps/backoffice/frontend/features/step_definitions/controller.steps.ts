import { Given, Then } from 'cucumber';
import request from 'supertest';
import app from '../../../../../../src/apps/backoffice/frontend/app';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to backoffice {string}', (route: string) => {
  _request = request(app).get(route);
});

Then('the backoffice response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});
