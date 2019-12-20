import { Request, Response } from 'express';
import CourseCreator from '../../../Contexts/Mooc/Courses/application/CourseCreator';
import httpStatus from 'http-status';
import Controller from './Controller';
import CourseAlreadyExists from '../../../Contexts/Mooc/Courses/domain/CourseAlreadyExists';

export class CoursePutController implements Controller {
  constructor(private courseCreator: CourseCreator) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;

    try {
      await this.courseCreator.run(id, name, duration);
    } catch (e) {

      if (e instanceof CourseAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(e.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
      }

    }

    res.status(httpStatus.CREATED).send();
  }
}
