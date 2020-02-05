import { MongoClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoClient } from 'mongodb';

describe('MongoClientFactory', () => {
  const factory = MongoClientFactory;
  let client: MongoClient;

  beforeEach(async () => {
    client = await factory.createClient('test');
  });

  afterEach(async () => {
    await client.close();
  });

  it('creates a new client if it does not exist', () => {
    expect(client).toBeInstanceOf(MongoClient);
  });

  it('creates a new client with existing name should return existing client', async () => {
    const newClient = await factory.createClient('test');
    expect(newClient).toBe(client);
  });
});
