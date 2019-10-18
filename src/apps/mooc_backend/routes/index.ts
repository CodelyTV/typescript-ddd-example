import { Express } from 'express';
import { createUserRoute } from './create-course.route';
import { statusRoute } from './status.route';

export function registerRoutes(app: Express) {
  createUserRoute(app);
  statusRoute(app);
}
