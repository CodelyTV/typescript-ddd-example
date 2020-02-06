import { MongoClient } from 'mongodb';
import { EnvironmentArranger } from './EnvironmentArranger';

export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {
    super();
  }

  protected async clean(name: string): Promise<void> {
    const hasCollection = await this.hasCollection(name);

    if (hasCollection) {
      await (await this.client()).db().dropCollection(name);
    }
  }

  private async hasCollection(name: string): Promise<boolean> {
    const client = await this.client();
    return await client
      .db()
      .listCollections({ name }, { nameOnly: true })
      .hasNext();
  }

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  public async close(): Promise<void> {
    return (await this.client()).close();
  }
}
