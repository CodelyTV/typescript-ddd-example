import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import httpStatus = require('http-status');
import { CoursesCounterNotExist } from '../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';

export class CoursesCounterGetController implements Controller {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const counter = await this.coursesCounterFinder.run();
      res.status(httpStatus.OK).send(counter);
    } catch (e) {
      if (e instanceof CoursesCounterNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
