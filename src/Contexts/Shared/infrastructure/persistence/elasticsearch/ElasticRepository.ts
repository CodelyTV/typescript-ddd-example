import { Client as ElasticClient } from '@elastic/elasticsearch';
import { AggregateRoot } from '../../../../Mooc/Courses/domain/AggregateRoot';

export abstract class ElasticRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<ElasticClient>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  protected async persist(index: string, aggregateRoot: T): Promise<void> {
    const document = { ...aggregateRoot.toPrimitives() };

    console.log('persist', document);
    (await this.client()).index({ index: index, body: document });
  }
}
