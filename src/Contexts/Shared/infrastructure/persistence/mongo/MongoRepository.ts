import { Collection, MongoClient } from 'mongodb';
import { MongoDocument } from './MongoDocument';

export class MongoRepository<T extends MongoDocument> {
  constructor(private _client: Promise<MongoClient>) {}

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(name: string): Promise<Collection<T>> {
    return (await this._client).db().collection(name);
  }

  protected async persist(document: T, collection: Collection<T>): Promise<void> {
    await collection.updateOne({ _id: document._id } as any, { $set: document }, { upsert: true });
  }
}
