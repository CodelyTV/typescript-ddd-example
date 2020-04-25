import { Connection } from 'typeorm';
import { TypeOrmClientFactory } from '../../../../src/Contexts/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory';

describe('Create a client', () => {
  const factory = TypeOrmClientFactory;
  let client: Connection;

  beforeEach(async () => {
    client = await factory.createClient('test');
  });

  afterEach(async () => {
    if (client.isConnected) {
      await client.close();
    }
  });

  it('creates a new client with the connection already established', () => {
    expect(client).toBeInstanceOf(Connection);
    expect(client.isConnected).toBeTruthy();
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newClient = await factory.createClient('test2');

    expect(newClient).not.toBe(client);

    await newClient.close();
  });

  it('returns a client if it already exists', async () => {
    const newClient = await factory.createClient('test');

    expect(newClient).toBe(client);

    await newClient.close();
  });
});
