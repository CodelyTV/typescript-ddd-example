import convict from 'convict';

const convictConfig = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  }
});

convictConfig.loadFile([__dirname + '/default.json', __dirname + '/' + convictConfig.get('env') + '.json']);

export default convictConfig;
