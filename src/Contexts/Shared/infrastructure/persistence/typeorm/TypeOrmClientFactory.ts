import { Connection, createConnection, getConnection } from 'typeorm';
import config from '../../../../../apps/mooc_backend/config/config';

export class TypeOrmClientFactory {
  static async createClient(contextName: string): Promise<Connection> {
    try {
      const connection = await createConnection({
        name: contextName,
        type: 'postgres',
        host: config.get('typeorm.host'),
        port: config.get('typeorm.port'),
        username: config.get('typeorm.username'),
        password: config.get('typeorm.password'),
        database: config.get('typeorm.database'),
        entities: [__dirname + `/../../../../${contextName}/**/**/infrastructure/persistence/typeorm/*{.js,.ts}`],
        synchronize: true
      });

      return connection;
    } catch (error) {
      return getConnection(contextName);
    }
  }
}
