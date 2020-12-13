import { MongoClient } from 'mongodb';
import { Nullable } from '../../../domain/Nullable';
import MongoConfig from './MongoConfig';

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(config);

      MongoClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<MongoClient> {
    return MongoClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
    const client = new MongoClient(config.url, { useUnifiedTopology: true, ignoreUndefined: true });

    await client.connect();

    return client;
  }

  private static registerClient(client: MongoClient, contextName: string): void {
    MongoClientFactory.clients[contextName] = client;
  }
}
