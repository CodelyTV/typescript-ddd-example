import { MongoClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/mongo/MongoClientFactory';
import { MongoClient } from 'mongodb';

describe('MongoClientFactory', () => {
  describe('#createClient', () => {
    const factory = MongoClientFactory;
    let client: MongoClient;

    beforeEach(async () => {
      client = await factory.createClient('test', { url: 'mongodb://localhost:27017/mooc-backend-test' });
    });

    afterEach(async () => {
      await client.close();
    });

    it('creates a new client with the connection already established', () => {
      expect(client).toBeInstanceOf(MongoClient);
      expect(client.isConnected()).toBeTruthy();
    });

    it('creates a new client if it does not exist a client with the given name', async () => {
      const newClient = await factory.createClient('test2', { url: 'mongodb://localhost:27017/mooc-backend-test' });

      expect(newClient).not.toBe(client);

      await newClient.close();
    });

    it('returns a client if it already exists', async () => {
      const newClient = await factory.createClient('test', { url: 'mongodb://localhost:27017/mooc-backend-test' });

      expect(newClient).toBe(client);

      await newClient.close();
    });
  });
});
