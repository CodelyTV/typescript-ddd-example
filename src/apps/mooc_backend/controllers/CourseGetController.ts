import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus = require('http-status');

import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { GetCourseQuery } from '../../../Contexts/Mooc/Courses/application/GetCourse/GetCourseQuery';
import { CourseResponse } from '../../../Contexts/Mooc/Shared/domain/Courses/application/CourseResponse';
import { CourseNotFound } from '../../../Contexts/Mooc/Courses/domain/CourseNotFound';

export class CourseGetController implements Controller {
  constructor(private queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
        const id: string = req.params.id;
        const query = new GetCourseQuery({id});
        const course = await this.queryBus.ask<CourseResponse>(query);
        res.status(httpStatus.OK).send(course);
    } catch (e) {
      if (e instanceof CourseNotFound) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
