import { Request, Response } from 'express';

export class HomeGetController {
  run(req: Request, res: Response) {
    res.render('pages/home', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice'
    });
  }
}
