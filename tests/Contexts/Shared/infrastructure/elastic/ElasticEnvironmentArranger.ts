import { Client as ElasticClient } from '@elastic/elasticsearch';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class ElasticEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<ElasticClient>) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.dropAllIndex();
  }

  protected async dropAllIndex(): Promise<void> {
    const client = await this.client();
    await client.indices.delete({
      index: '*'
    });
  }

  protected client(): Promise<ElasticClient> {
    return this._client;
  }

  public async close(): Promise<void> {}
}
