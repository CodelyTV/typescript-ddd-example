import ElasticConfig from '../../../../Shared/infrastructure/persistence/elasticsearch/ElasticConfig';
import config from '../config';

export class BackofficeElasticConfigFactory {
  static createConfig(): ElasticConfig {
    return {
      url: config.get('elastic.url'),
      indexName: config.get('elastic.indexName'),
      indexConfig: config.get('elastic.config')
    };
  }
}
