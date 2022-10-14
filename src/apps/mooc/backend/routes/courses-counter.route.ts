import { Request, Response, Router } from 'express';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const coursesCounterGetController = container.get('Apps.mooc.controllers.CoursesCounterGetController');
  router.get('/courses-counter', (req: Request, res: Response) => coursesCounterGetController.run(req, res));
};
