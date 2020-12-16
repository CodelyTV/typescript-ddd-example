import { Express } from 'express';
import container from '../dependency-injection';
import StatusController from '../controllers/StatusGetController';

export const register = (app: Express) => {
  const controller: StatusController = container.get('Apps.Backoffice.Backend.controllers.StatusGetController');
  app.get('/status', controller.run.bind(controller));
};
