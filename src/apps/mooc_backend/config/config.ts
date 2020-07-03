import convict from 'convict';

const convictConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The Mongo connection URL',
      format: String,
      env: 'MONGO_URL',
      default: 'mongodb://mongo:27017/dev'
    }
  }
});

convictConfig.loadFile([__dirname + '/default.json', __dirname + '/' + convictConfig.get('env') + '.json']);

export default convictConfig;
