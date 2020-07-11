import { Request, Response } from 'express';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/application/CreateCourseCommand';

export class CoursesPostController {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    // TODO: validation
    // req.flash('errors.id', 'Flash Message Added');

    await this.createCourse(req, res);
  }

  private async createCourse(req: Request, res: Response) {
    const createCourseCommand = new CreateCourseCommand({
      id: req.body.id,
      name: req.body.name,
      duration: req.body.duration
    });
    await this.commandBus.dispatch(createCourseCommand);

    req.flash('message', `Felicidades, el curso ${req.body.name} ha sido creado!`);
    res.redirect('/courses');
  }
}
