import convict from 'convict';

// We Keep same Mongo connection URL but create a new config so it can be migrated easily
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
      default: 'mongodb://localhost:27017/mooc-backend-dev'
    }
  }
});

convictConfig.loadFile([__dirname + '/default.json', __dirname + '/' + convictConfig.get('env') + '.json']);

export default convictConfig;
