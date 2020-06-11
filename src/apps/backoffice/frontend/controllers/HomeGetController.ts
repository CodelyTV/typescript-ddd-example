import { Request, Response } from 'express';

export class HomeGetController {
  run(req: Request, res: Response) {
    res.render('index', { foo: 'FOO' });
  }
}
