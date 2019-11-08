import { Request, Response } from 'express';
import CreateCourse from '../../../Contexts/Mooc/Courses/application/CreateCourse';
import httpStatus from 'http-status';
import Controller from './Controller';

export default class CoursePutController implements Controller {
  constructor(private createCourse: CreateCourse) {}

  async run(req: Request, res: Response) {
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
