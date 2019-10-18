import { Request, Response } from 'express';
import CreateCourse from '../../../Mooc/Courses/application/CreateCourse';
import httpStatus from 'http-status';

export default class CreateCourseController {
  constructor(private createCourse: CreateCourse) {}

  async create(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;

    try {
      await this.createCourse.run(id, name, duration);
    } catch (e) {
      res.status(500).json(e);
    }

    res.status(httpStatus.CREATED).send();
  }
}
