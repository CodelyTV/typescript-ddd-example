import { Express } from 'express';
import container from '../config/dependency-injection';
import { StatusGetController } from '../controllers/StatusGetController';

export const register = (app: Express) => {
  const controller: StatusGetController = container.get('Apps.Backoffice.Frontend.controllers.StatusGetController');
  app.get('/status', controller.run.bind(controller));
};
