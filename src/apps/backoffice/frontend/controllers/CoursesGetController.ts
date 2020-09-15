import { Request, Response } from 'express';
import { Uuid } from '../../../../Contexts/Shared/domain/value-object/Uuid';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { FindCoursesCounterResponse } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';
import { FindCoursesCounterQuery } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { WebController } from './WebController';

export class CoursesGetController extends WebController {
  constructor(private queryBus: QueryBus) {
    super();
  }

  async run(req: Request, res: Response) {
    const courses = await this.queryBus.ask<FindCoursesCounterResponse>(new FindCoursesCounterQuery());

    this.render(req, res, 'pages/courses/courses', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice',
      courses_counter: courses.total,
      id: Uuid.random().value
    });
  }
}
