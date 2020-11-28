import { Express } from 'express';
import container from '../dependency-injection';
import { HomeGetController } from '../controllers/HomeGetController';

export const register = (app: Express) => {
  const controller: HomeGetController = container.get('Apps.Backoffice.Frontend.controllers.HomeGetController');
  app.get('/', controller.run.bind(controller));
};
