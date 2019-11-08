import { Express } from 'express';
import container from '../config/dependency-injection';
import CreateCourseController from '../controllers/CoursePutController';

export const register = (app: Express) => {
  const controller: CreateCourseController = container.get('Apps.mooc.controllers.CoursePutController');
  app.put('/courses/:id', controller.run.bind(controller));
};
