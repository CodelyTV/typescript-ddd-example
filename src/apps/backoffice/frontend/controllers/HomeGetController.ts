import { Request, Response } from 'express';

export class HomeGetController {
  run(req: Request, res: Response) {
    res.render('index', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice'
    });
  }
}
