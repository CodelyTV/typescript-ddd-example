import { Request, Response } from 'express';
import CreateCourse from '../../../Mooc/Courses/application/CreateCourse';
import httpStatus from 'http-status';

export default class CreateCourseController {
  constructor(private createUser: CreateCourse) {}

  async create(req: Request, res: Response) {
    try {
      await this.createUser.run();
    } catch (e) {
      res.status(500).json(e);
    }

    res.status(httpStatus.CREATED).send();
  }
}
