import { Request, Response } from 'express';
import { Controller } from './Controller';
import { CommandBus } from '../../../Contexts/Shared/domain/CommandBus';
import { RenameCourseCommand } from '../../../Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommand';
import { CourseNotFound } from '../../../Contexts/Mooc/Courses/domain/CourseNotFound';
import httpStatus from 'http-status';

export class CourseRenameController implements Controller {
    constructor(private commandBus: CommandBus) {}
  
    async run(req: Request, res: Response) {
      const id: string = req.params.id;
      const name: string = req.body.name;
      const renameCourseCommand = new RenameCourseCommand({ id, name });
  
      try {
        await this.commandBus.dispatch(renameCourseCommand);
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