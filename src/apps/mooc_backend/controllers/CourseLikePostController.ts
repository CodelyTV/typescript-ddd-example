import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { LikeCourseCommand } from '../../../Contexts/Mooc/Courses/application/LikeCourse/LikeCourseCommand';
import { CourseNotFound } from '../../../Contexts/Mooc/Courses/domain/CourseNotFound';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';

export class CourseLikePostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { userId } = req.body;

    const command = new LikeCourseCommand({ id, userId });

    try {
      await this.commandBus.dispatch(command);
    } catch (error) {
      if (error instanceof CourseNotFound) {
        res.status(httpStatus.NOT_FOUND).send(error.message);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
      }
    }

    res.status(httpStatus.NO_CONTENT).send();
  }
}
