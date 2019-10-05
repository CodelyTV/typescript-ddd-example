import request from 'supertest';
import app from '../../../../src/apps/mooc/app';

describe('Create Course Feature', () => {
  it('should respond with a 201 Created code', async () => {
    await request(app)
      .post('/courses')
      .send({})
      .expect(201);
  });
});
