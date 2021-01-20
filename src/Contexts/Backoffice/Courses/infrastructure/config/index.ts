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
    indexName: 'backofficecourses',
    config: {
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
});

backofficeConfig.loadFile([__dirname + '/default.json', __dirname + '/' + backofficeConfig.get('env') + '.json']);

export default backofficeConfig;
