import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';

export class CoursesGetController {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}

  async run(req: Request, res: Response) {
    const courses = await this.coursesCounterFinder.run();

    res.render('pages/courses', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice',
      courses_counter: courses.total,
      new_course_id: 'xxxx'
    });
  }
}
