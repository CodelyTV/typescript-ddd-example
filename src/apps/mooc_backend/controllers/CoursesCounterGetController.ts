import { Controller } from './Controller';
import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import httpStatus = require('http-status');

export class CoursesCounterGetController implements Controller {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}
  async run(req: Request, res: Response): Promise<void> {
    const counter = this.coursesCounterFinder.run();

    res.status(httpStatus.OK).send(counter);
  }
}
