import config from '../../config';
import MongoConfig from '@/Contexts/Shared/infrastructure/persistence/mongo/MongoConfig';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
