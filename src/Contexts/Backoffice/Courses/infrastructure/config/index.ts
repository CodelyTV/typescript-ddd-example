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
    }
  }
});

backofficeConfig.loadFile([__dirname + '/default.json', __dirname + '/' + backofficeConfig.get('env') + '.json']);

export default backofficeConfig;
