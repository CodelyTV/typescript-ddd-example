import bodyParser from 'body-parser';
import express from 'express';
import { registerRoutes } from './infrastructure/routes';

const app: express.Express = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

registerRoutes(app);

export default app;
