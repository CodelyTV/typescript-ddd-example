import { Client as ElasticClient } from '@elastic/elasticsearch';
import config from '../../../../../apps/backoffice/backend/config/config';
import { Nullable } from '../../../domain/Nullable';

export class ElasticClientFactory {
  private static clients: { [key: string]: ElasticClient } = {};

  static async createClient(contextName: string): Promise<ElasticClient> {
    let client = ElasticClientFactory.getClient(contextName);

    if (!client) {
      client = await ElasticClientFactory.createAndConnectClient();

      ElasticClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<ElasticClient> {
    return ElasticClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(): Promise<ElasticClient> {
    const client = new ElasticClient({ node: config.get('elastic.url') });

    return client;
  }

  private static registerClient(client: ElasticClient, contextName: string): void {
    ElasticClientFactory.clients[contextName] = client;
  }
}
