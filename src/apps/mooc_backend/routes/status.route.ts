import { Express } from 'express';
import container from '../config/dependency-injection';
import StatusController from '../controllers/StatusController';

export const statusRoute = (app: Express) => {
  const controller: StatusController = container.get('Apps.mooc.controllers.StatusController');
  app.get('/status', (req, res) => controller.create(req, res));
};
