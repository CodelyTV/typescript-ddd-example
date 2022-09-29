import { Connection, EntitySchema, Repository } from 'typeorm';
import { AggregateRoot } from '../../../domain/AggregateRoot';

export abstract class TypeOrmRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<Connection>) {}

  protected abstract entitySchema(): EntitySchema<T>;

  protected client(): Promise<Connection> {
    return this._client;
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this._client).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot as any);
  }
}
