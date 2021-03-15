import bodyParser from 'body-parser';
import compress from 'compression';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import nunjucks from 'nunjucks';
import path from 'path';
import Logger from '../../../Contexts/Shared/domain/Logger';
import container from './dependency-injection';
import { registerRoutes } from './routes';

export class Server {
  private express: express.Express;
  readonly port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get('Shared.Logger');
    this.express = express();
    this.express.use(cookieParser());
    this.express.use(
      cookieSession({
        name: 'Backoffice Frontend Codely session',
        keys: ['Codely'],
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      })
    );
    this.express.use(flash());
    // Templates
    this.express.set('view engine', 'html');
    nunjucks.configure(path.join(__dirname, '/templates'), {
      autoescape: true,
      express: this.express,
      watch: true
    });
    this.express.use(express.static(path.join(__dirname, '/public')));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);
    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      this.logger.error(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Backoffice Frontend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
