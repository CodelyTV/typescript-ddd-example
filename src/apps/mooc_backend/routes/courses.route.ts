import { Express } from 'express';
import container from '../config/dependency-injection';
import CreateCourseController from '../controllers/CreateCourseController';

export const register = (app: Express) => {
  const controller: CreateCourseController = container.get('Apps.mooc.controllers.CreateCourseController');
  app.put('/courses/:id', controller.create.bind(controller));
};
