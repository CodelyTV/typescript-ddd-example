import { Request, Response } from 'express';
import { Uuid } from '../../../../Contexts/Shared/domain/value-object/Uuid';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { FindCoursesCounterResponse } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';
import { FindCoursesCounterQuery } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';

export class CoursesGetController {
  constructor(private queryBus: QueryBus) {}

  async run(req: Request, res: Response) {
    const courses = await this.queryBus.ask<FindCoursesCounterResponse>(new FindCoursesCounterQuery());

    res.render('pages/courses/courses', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice',
      courses_counter: courses.total,
      new_course_id: Uuid.random(),
      flash: req.flash()
    });
  }
}
