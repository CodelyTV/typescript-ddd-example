import { CoursesResponse } from './../../../Contexts/Mooc/Courses/application/GetCourses/CoursesResponse';
import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { QueryBus } from '../../../Contexts/Shared/domain/QueryBus';
import { GetCoursesQuery } from '../../../Contexts/Mooc/Courses/application/GetCourses/GetCoursesQuery';

export class CoursesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
        const query = new GetCoursesQuery();
        const course = await this.queryBus.ask<CoursesResponse>(query);
        res.status(httpStatus.OK).send(course);
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}
