import { Request, Response } from 'express';
import httpStatus from 'http-status';

export default class StatusController {
  async create(req: Request, res: Response) {
    res.status(httpStatus.OK).send();
  }
}
