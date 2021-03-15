import convict from 'convict';

const backofficeConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  elastic: {
    url: {
      doc: 'The Elastic connection URL',
      format: String,
      env: 'ELASTIC_URL',
      default: 'http://localhost:9200'
    },
    indexName: {
      doc: 'The Elastic index name for this context',
      format: String,
      env: 'ELASTIC_INDEX_NAME',
      default: 'backofficecourses'
    },
    config: {
      doc: 'The Elastic config for this context',
      format: '*',
      env: 'ELASTIC_CONFIG',
      default: {
        settings: {
          index: {
            number_of_replicas: 0 // for local development
          }
        },
        mappings: {
          properties: {
            id: {
              type: 'keyword',
              index: true
            },
            name: {
              type: 'text',
              index: true,
              fielddata: true
            },
            duration: {
              type: 'text',
              index: true,
              fielddata: true
            }
          }
        }
      }
    }
  },
  rabbitMQ: {
    host: {
      doc: 'The RabbitMQ connection host',
      format: String,
      env: 'RABBITMQ_HOST',
      default: 'localhost'
    },
    user: {
      doc: 'The RabbitMQ connection user',
      format: String,
      env: 'RABBITMQ_DEFAULT_USER',
      default: 'guest'
    },
    password: {
      doc: 'The RabbitMQ connection password',
      format: String,
      env: 'RABBITMQ_DEFAULT_PASS',
      default: 'guest'
    },
    queue: {
      doc: 'Queue where subscribers listen on',
      format: String,
      env: 'RABBITMQ_QUEUE',
      default: 'BackofficeCourses-DomainEvents'
    },
    exchange: {
      doc: 'Exchange where events are published',
      format: String,
      env: 'RABBITMQ_EXCHANGE',
      default: 'DomainEvents'
    }
  }
});

backofficeConfig.loadFile([__dirname + '/default.json', __dirname + '/' + backofficeConfig.get('env') + '.json']);

export default backofficeConfig;
