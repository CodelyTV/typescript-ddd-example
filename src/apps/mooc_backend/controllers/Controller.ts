import {Request, Response} from 'express';

export default interface Controller {
  run(req: Request, res: Response): Promise<void>;
}
