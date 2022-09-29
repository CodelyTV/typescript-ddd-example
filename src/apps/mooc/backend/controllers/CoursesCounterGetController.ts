import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { FindCoursesCounterQuery } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { FindCoursesCounterResponse } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';
import { CoursesCounterNotExist } from '../../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';

export class CoursesCounterGetController implements Controller {
  constructor(private queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindCoursesCounterQuery();
      const { total } = await this.queryBus.ask<FindCoursesCounterResponse>(query);

      res.json({ total });
    } catch (e) {
      if (e instanceof CoursesCounterNotExist) {
        res.sendStatus(httpStatus.NOT_FOUND);
      } else {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
