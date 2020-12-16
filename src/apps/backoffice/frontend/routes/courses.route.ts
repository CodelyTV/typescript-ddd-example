import { Express } from 'express';
import container from '../dependency-injection';
import { CoursesGetController } from '../controllers/CoursesGetController';
import { CoursesPostController } from '../controllers/CoursesPostController';

export const register = (app: Express) => {
  const coursesGetController: CoursesGetController = container.get(
    'Apps.Backoffice.Frontend.controllers.CoursesGetController'
  );
  const coursesPostController: CoursesPostController = container.get(
    'Apps.Backoffice.Frontend.controllers.CoursesPostController'
  );

  app.get('/courses', coursesGetController.run.bind(coursesGetController));
  app.post('/courses', CoursesPostController.validator(), coursesPostController.run.bind(coursesPostController));
};
