import { Controller } from './Controller';
import { Request, Response } from 'express';
import httpStatus = require('http-status');
import { CoursesCounterNotExist } from '../../../../Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { FindCoursesCounterQuery } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { FindCoursesCounterResponse } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterResponse';

export class CoursesCounterGetController implements Controller {
  constructor(private queryBus: QueryBus) {}
  async run(req: Request, res: Response): Promise<void> {
    try {
      const query = new FindCoursesCounterQuery();
      const count = await this.queryBus.ask<FindCoursesCounterResponse>(query);

      res.status(httpStatus.OK).send(count);
    } catch (e) {
      if (e instanceof CoursesCounterNotExist) {
        res.status(httpStatus.NOT_FOUND).send();
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
      }
    }
  }
}
