import config from '../../config';
import MongoConfig from '../../../../../Shared/infrastructure/persistence/mongo/MongoConfig';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
