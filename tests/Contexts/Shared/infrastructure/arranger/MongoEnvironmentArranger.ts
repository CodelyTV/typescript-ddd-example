import { MongoClient } from 'mongodb';
import { EnvironmentArranger } from './EnvironmentArranger';

export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {
    super();
  }

  protected async clean(name: string): Promise<void> {
    await (await this.client()).db().dropCollection(name);
  }

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  public async close(): Promise<void> {
    return (await this.client()).close();
  }
}
