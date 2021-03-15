import { Client as ElasticClient } from '@elastic/elasticsearch';
import { Nullable } from '../../../domain/Nullable';
import ElasticConfig from './ElasticConfig';

export class ElasticClientFactory {
  private static clients: { [key: string]: ElasticClient } = {};

  static async createClient(contextName: string, config: ElasticConfig): Promise<ElasticClient> {
    let client = ElasticClientFactory.getClient(contextName);

    if (!client) {
      client = await ElasticClientFactory.createAndConnectClient(config);

      await ElasticClientFactory.createIndexWithSettingsIfNotExists(client, config);

      ElasticClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<ElasticClient> {
    return ElasticClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(config: ElasticConfig): Promise<ElasticClient> {
    const client = new ElasticClient({ node: config.url });

    return client;
  }

  private static registerClient(client: ElasticClient, contextName: string): void {
    ElasticClientFactory.clients[contextName] = client;
  }

  private static async createIndexWithSettingsIfNotExists(client: ElasticClient, config: ElasticConfig): Promise<void> {
    const { body: exist } = await client.indices.exists({ index: config.indexName });

    if (!exist) {
      await client.indices.create({
        index: config.indexName,
        body: config.indexConfig
      });
    }
  }
}
