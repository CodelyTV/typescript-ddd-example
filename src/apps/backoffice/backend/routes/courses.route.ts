import { Express } from 'express';
import container from '../dependency-injection';
import { CoursesPostController } from '../controllers/CoursesPostController';

export const register = (app: Express) => {
  const coursesPostController: CoursesPostController = container.get(
    'Apps.Backoffice.Backend.controllers.CoursesPostController'
  );
  const coursesGetController: CoursesPostController = container.get(
    'Apps.Backoffice.Backend.controllers.CoursesGetController'
  );

  app.post('/courses', coursesPostController.run.bind(coursesPostController));
  app.get('/courses', coursesGetController.run.bind(coursesGetController));
};
