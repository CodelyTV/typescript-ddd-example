import { Request, Response } from 'express';
import { CoursesCounterFinder } from '../../../../Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { Uuid } from '../../../../Contexts/Shared/domain/value-object/Uuid';

export class CoursesGetController {
  constructor(private coursesCounterFinder: CoursesCounterFinder) {}

  async run(req: Request, res: Response) {
    const courses = await this.coursesCounterFinder.run();

    res.render('pages/courses/courses', {
      title: 'Welcome',
      description: 'CodelyTV - Backoffice',
      courses_counter: courses.total,
      new_course_id: Uuid.random(),
      flash: req.flash()
    });
  }
}
