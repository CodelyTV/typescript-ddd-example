import { Express } from 'express';
import container from '../config/dependency-injection';

export const register = (app: Express) => {
  const coursePutController = container.get('Apps.mooc.controllers.CoursePutController');
  app.put('/courses/:id', coursePutController.run.bind(coursePutController));

  const coursesCounterGetController = container.get('Apps.mooc.controllers.CoursesCounterGetController');
  app.get('/courses-counter', coursesCounterGetController.run.bind(coursesCounterGetController));
};
