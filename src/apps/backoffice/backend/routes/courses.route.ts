import { Express } from 'express';
import container from '../dependency-injection';
import { CoursesGetController } from '../controllers/CoursesGetController';

export const register = (app: Express) => {
  const coursesGetController: CoursesGetController = container.get(
    'Apps.Backoffice.Backend.controllers.CoursesGetController'
  );
  app.get('/courses', coursesGetController.run.bind(coursesGetController));
};
