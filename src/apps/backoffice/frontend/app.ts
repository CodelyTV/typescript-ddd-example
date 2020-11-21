import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import { registerRoutes } from './routes';
import path from 'path';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import nunjucks from 'nunjucks';
import { registerSubscribers } from './subscribers';

const app: express.Express = express();

app.set('port', process.env.PORT || 8032);

app.use(cookieParser());
app.use(
  cookieSession({
    name: 'Backoffice Frontend Codely session',
    keys: ['Codely'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(flash());

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
registerSubscribers();

export default app;
