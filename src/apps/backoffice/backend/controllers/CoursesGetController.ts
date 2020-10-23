import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SearchAllCoursesQuery } from '../../../../Contexts/Backoffice/application/SearchAll/SearchAllCoursesQuery';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';

export class CoursesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const query = new SearchAllCoursesQuery();
    const courses = await this.queryBus.ask(query);

    res.status(httpStatus.OK).send(courses);
  }
}
