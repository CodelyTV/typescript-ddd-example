import { Express } from 'express';
import { statusRoute } from './status.route';
import { createUserRoute } from './create-course.route';

export function registerRoutes(app: Express) {
  statusRoute(app);
  createUserRoute(app);
}
