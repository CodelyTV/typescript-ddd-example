import config from '../../../../../apps/mooc/backend/config/config';
import MongoConfig from '../../../../Shared/infrastructure/persistence/mongo/MongoConfig';

export class BackofficeMongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
