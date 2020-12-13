import errorHandler from 'errorhandler';
import app from './app';
import container from './config/dependency-injection';
import { seed } from './seed';

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), async () => {
  const winstonLogger = container.get('Shared.Logger');

  await seed();

  winstonLogger.info(
    `  Backoffice frontend is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;
