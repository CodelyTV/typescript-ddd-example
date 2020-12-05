import { Router, Request, Response } from 'express';
import container from '../config/dependency-injection';

export const register = (router: Router) => {
  const coursePutController = container.get('Apps.mooc.controllers.CoursePutController');
  router.put('/courses/:id', (req: Request, res: Response) => coursePutController.run(req, res));

  const courseRenameController = container.get('Apps.mooc.controllers.CourseRenameController');
  router.put('/courses/:id/rename', (req: Request, res: Response) => courseRenameController.run(req, res));

  const courseGetController = container.get('Apps.mooc.controllers.CourseGetController');
  router.get('/courses/:id', (req: Request, res: Response) => courseGetController.run(req, res));

  const coursesCounterGetController = container.get('Apps.mooc.controllers.CoursesCounterGetController');
  router.get('/courses-counter', (req: Request, res: Response) => coursesCounterGetController.run(req, res));
};
