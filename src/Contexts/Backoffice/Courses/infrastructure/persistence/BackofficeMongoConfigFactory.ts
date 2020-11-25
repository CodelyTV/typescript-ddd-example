import config from '../../../../../apps/mooc_backend/config/config';
import MongoConfig from '../../../../Shared/infrastructure/persistence/mongo/MongoConfig';

export class BackofficeMongoConfigFactory {
  static createConfig(): MongoConfig {
    console.log(config.get('mongo.url'));
    return {
      url: config.get('mongo.url')
    };
  }
}
