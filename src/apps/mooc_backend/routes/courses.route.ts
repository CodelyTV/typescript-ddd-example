import { Express } from 'express';
import container from '../config/dependency-injection';
import {CoursePutController} from '../controllers/CoursePutController';

export const register = (app: Express) => {
  const controller: CoursePutController = container.get('Apps.mooc.controllers.CoursePutController');
  app.put('/courses/:id', controller.run.bind(controller));
};
