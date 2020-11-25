import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { CourseAlreadyExists } from '../../../../Contexts/Mooc/Courses/domain/CourseAlreadyExists';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/application/CreateCourseCommand';

export class CoursePutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const duration: string = req.body.duration;
    const createCourseCommand = new CreateCourseCommand({ id, name, duration });

    try {
      await this.commandBus.dispatch(createCourseCommand);
    } catch (error) {
      if (error instanceof CourseAlreadyExists) {
        res.status(httpStatus.BAD_REQUEST).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.CREATED).send();
  }
}
