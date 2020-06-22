import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';

export class CoursesGetController {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}

  async run(req: Request, res: Response) {
    let coursesNumber;
    try {
      const courses = await this.coursesCounterFinder.run();
      coursesNumber = courses.total;
    } catch (error) {
      coursesNumber = 0;
    }

    res.render('pages/courses', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice',
      courses_counter: coursesNumber,
      new_course_id: 'xxxx'
    });
  }
}
