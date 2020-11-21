import errorHandler from 'errorhandler';
import app from './app';
import container from './config/dependency-injection';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  // tslint:disable: no-console
  const logger = container.get('Shared.Logger');

  logger.info(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('  Press CTRL-C to stop\n');
});

export default server;
