import { Connection, EntityMetadata } from 'typeorm';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';

export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<Connection>) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  protected async cleanDatabase(): Promise<void> {
    const entities = await this.entities();

    try {
      for (const entity of entities) {
        const repository = (await this._client).getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE ${entity.tableName};`);
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`);
    }
  }

  private async entities(): Promise<EntityMetadata[]> {
    return (await this._client).entityMetadatas;
  }

  protected client(): Promise<Connection> {
    return this._client;
  }

  public async close(): Promise<void> {
    return (await this.client()).close();
  }
}