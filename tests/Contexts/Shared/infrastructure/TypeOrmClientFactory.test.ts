import { Connection } from 'typeorm';
import { TypeOrmClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';

describe('TypeOrmClientFactory', () => {
  const factory = TypeOrmClientFactory;
  let client: Connection;

  beforeEach(async () => {
    client = await factory.createClient('test', { host:"localhost", port: 5432, username: "codely", password:"codely",database: 'mooc-backend-dev' });
  });

  afterEach(async () => {
    await client.close();
  });

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(Connection);
    expect(client.isConnected).toBe(true);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2', { host:"localhost", port: 5432, username: "codely", password:"codely",database: 'mooc-backend-dev' });

    expect(newClient).not.toBe(client);
    expect(newClient.isConnected).toBeTruthy();

    await newClient.close();
  });

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test', { host:"localhost", port: 5432, username: "codely", password:"codely",database: 'mooc-backend-dev' });

    expect(newClient).toBe(client);
    expect(newClient.isConnected).toBeTruthy();
  });
});
