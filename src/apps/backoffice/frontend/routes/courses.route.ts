import { Express } from 'express';
import container from '../config/dependency-injection';
import { CoursesGetController } from '../controllers/CoursesGetController';

export const register = (app: Express) => {
  const controller: CoursesGetController = container.get('Apps.Backoffice.Frontend.controllers.CoursesGetController');
  app.get('/courses', controller.run.bind(controller));
};
