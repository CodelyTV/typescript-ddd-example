import { Client as ElasticClient } from '@elastic/elasticsearch';
import ElasticConfig from '../../../../../src/Contexts/Shared/infrastructure/persistence/elasticsearch/ElasticConfig';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class ElasticEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<ElasticClient>, private config: ElasticConfig) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.dropIndex(this.config.indexName);
  }

  protected async dropIndex(indexName: string): Promise<void> {
    const client = await this.client();

    await client.deleteByQuery({
      index: indexName,
      body: {
        query: {
          match_all: {}
        }
      },
      refresh: true
    });
  }

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  public async close(): Promise<void> {}
}
