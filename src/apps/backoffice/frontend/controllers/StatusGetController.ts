import { Request, Response } from 'express';
import httpStatus from 'http-status';

export class StatusGetController {
  async run(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
