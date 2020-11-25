import { Client as ElasticClient } from '@elastic/elasticsearch';
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class ElasticRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<ElasticClient>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  protected async persist(index: string, aggregateRoot: T): Promise<void> {
    const document = { ...aggregateRoot.toPrimitives() };
    const client = await this.client();

    await client.index({ index: index, body: document, refresh: 'wait_for' }); // wait_for wait for a refresh to make this operation visible to search
  }
}
