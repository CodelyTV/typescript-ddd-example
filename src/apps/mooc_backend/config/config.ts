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
      env: 'MONGO_URL'
    }
  },
  typeorm: {
    host: {
      doc: 'The database host',
      format: String,
      env: 'TYPEORM_HOST'
    },
    port: {
      doc: 'The database port',
      format: Number,
      env: 'TYPEORM_PORT'
    },
    username: {
      doc: 'The database username',
      format: String,
      env: 'TYPEORM_USERNAME'
    },
    password: {
      doc: 'The database password',
      format: String,
      env: 'TYPEORM_PASSWORD'
    },
    database: {
      doc: 'The database name',
      format: String,
      env: 'TYPEORM_DATABASE'
    }
  }
});

convictConfig.loadFile([__dirname + '/default.json', __dirname + '/' + convictConfig.get('env') + '.json']);

export default convictConfig;
