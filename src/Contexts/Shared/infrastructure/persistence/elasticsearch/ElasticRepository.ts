import { Client as ElasticClient } from '@elastic/elasticsearch';
import { ResponseError } from '@elastic/elasticsearch/lib/errors';
import bodybuilder, { Bodybuilder } from 'bodybuilder';
import httpStatus from 'http-status';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';
import ElasticConfig from './ElasticConfig';
import { ElasticCriteriaConverter, TypeQueryEnum } from './ElasticCriteriaConverter';

type Hit = { _source: any };

export abstract class ElasticRepository<T extends AggregateRoot> {
  private criteriaConverter: ElasticCriteriaConverter;

  constructor(private _client: Promise<ElasticClient>, private config: ElasticConfig) {
    this.criteriaConverter = new ElasticCriteriaConverter();
  }

  protected indexName(): string {
    return this.config.indexName;
  }

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  protected async searchAllInElastic(unserializer: (data: any) => T): Promise<T[]> {
    const body = bodybuilder().query(TypeQueryEnum.MATCH_ALL);

    return this.searchInElasticWithBuilder(unserializer, body);
  }

  protected async searchByCriteria(criteria: Criteria, unserializer: (data: any) => T): Promise<T[]> {
    const body = this.criteriaConverter.convert(criteria);

    return this.searchInElasticWithBuilder(unserializer, body);
  }

  private async searchInElasticWithBuilder(unserializer: (data: any) => T, body: Bodybuilder): Promise<T[]> {
    const client = await this.client();

    try {
      const response = await client.search({
        index: this.indexName(),
        body: body.build()
      });

      return response.body.hits.hits.map((hit: Hit) => unserializer({ ...hit._source }));
    } catch (e) {
      if (this.isNotFoundError(e)) {
        return [];
      }
      throw e;
    }
  }

  private isNotFoundError(e: any) {
    return e instanceof ResponseError && (e as ResponseError).meta.statusCode === httpStatus.NOT_FOUND;
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const client = await this.client();
    const document = { ...aggregateRoot.toPrimitives() };

    await client.index({ index: this.indexName(), id, body: document, refresh: 'wait_for' }); // wait_for wait for a refresh to make this operation visible to search
  }
}
