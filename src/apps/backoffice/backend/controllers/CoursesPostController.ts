import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/domain/CreateCourseCommand';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { Controller } from './Controller';

type CreateCourseRequest = {
  id: string;
  name: string;
  duration: string;
};

export class CoursesPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request<CreateCourseRequest>, res: Response) {
    await this.createCourse(req);
    res.status(httpStatus.OK).send();
  }

  private async createCourse(req: Request<CreateCourseRequest>) {
    const createCourseCommand = new CreateCourseCommand({
      id: req.body.id,
      name: req.body.name,
      duration: req.body.duration
    });

    await this.commandBus.dispatch(createCourseCommand);
  }
}
