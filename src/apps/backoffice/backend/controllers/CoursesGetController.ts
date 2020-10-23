import { Request, Response } from 'express';
import { Controller } from './Controller';

export class CoursesGetController implements Controller {
  async run(_req: Request, res: Response) {
    res.status(200).send({
      courses: [
        {
          id: '8c900b20-e04a-4777-9183-32faab6d2fb5',
          name: 'DDD en PHP!',
          duration: '25 hours'
        },
        {
          id: '8c4a4ed8-9458-489e-a167-b099d81fa096',
          name: 'DDD en Java!',
          duration: '24 hours'
        }
      ]
    });
  }
}
