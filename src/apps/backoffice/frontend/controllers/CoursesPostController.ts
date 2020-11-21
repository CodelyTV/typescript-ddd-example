import { Request, Response } from 'express';
import { CommandBus } from '../../../../Contexts/Shared/domain/CommandBus';
import { CreateCourseCommand } from '../../../../Contexts/Mooc/Courses/application/CreateCourseCommand';
import { body, ValidationChain } from 'express-validator';
import { WebController } from './WebController';

export class CoursesPostController extends WebController {
  constructor(private commandBus: CommandBus) {
    super();
  }

  static validator(): ValidationChain[] {
    return [
      body('id').isUUID().withMessage('Invalid course id'),
      body('name').isLength({ min: 1, max: 30 }).withMessage('Invalid name'),
      body('duration').isLength({ min: 4, max: 100 }).withMessage('Invalid duration')
    ];
  }

  async run(req: Request, res: Response) {
    const errors = this.validateRequest(req);
    if (errors.length === 0) {
      await this.createCourse(req, res);
    } else {
      this.redirectWithErrors(req, res, errors);
    }
  }

  private async createCourse(req: Request, res: Response) {
    const createCourseCommand = new CreateCourseCommand({
      id: req.body.id,
      name: req.body.name,
      duration: req.body.duration
    });

    await this.commandBus.dispatch(createCourseCommand);

    this.redirectWithMessage(req, res, '/courses', `Felicidades, el curso ${req.body.name} ha sido creado!`);
  }
}
