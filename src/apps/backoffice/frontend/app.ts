import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import { registerRoutes } from './routes';
import path from 'path';
import nunjucks from 'nunjucks';

const app: express.Express = express();

app.set('port', process.env.PORT || 8032);

// Templates
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, '/templates'), {
  autoescape: true,
  express: app,
  watch: true
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());

registerRoutes(app);

export default app;
