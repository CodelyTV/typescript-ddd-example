import { Client as ElasticClient } from '@elastic/elasticsearch';
import { AggregateRoot } from '../../../domain/AggregateRoot';

type Hit = { _source: any };

export abstract class ElasticRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<ElasticClient>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  protected async searchAllInElastic(unserializer: (data: any) => T): Promise<T[]> {
    const client = await this.client();

    const response = await client.search({
      index: this.moduleName(),
      body: {
        query: {
          match_all: {}
        }
      }
    });

    return response.body.hits.hits.map((hit: Hit) => unserializer({ ...hit._source }));
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const client = await this.client();
    const document = { ...aggregateRoot.toPrimitives() };

    await client.index({ index: this.moduleName(), body: document, refresh: 'wait_for' }); // wait_for wait for a refresh to make this operation visible to search
  }
}
