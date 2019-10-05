import {Express} from 'express';
import { createUserRoute } from './create-course.route';

export function registerRoutes(app: Express) {

  createUserRoute(app);
}
