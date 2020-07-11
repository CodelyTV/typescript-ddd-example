import { Request, Response } from 'express';
import { CreateCourseRequest } from '../../../../Contexts/Mooc/Courses/application/CreateCourseRequest';
import { CourseCreator } from '../../../../Contexts/Mooc/Courses/application/CourseCreator';

export class CoursesPostController {
  constructor(private courseCreator: CourseCreator) {}

  async run(req: Request, res: Response) {
    // TODO: validation
    // req.flash('errors.id', 'Flash Message Added');

    await this.createCourse(req, res);
  }

  private async createCourse(req: Request, res: Response) {
    await this.courseCreator.run({
      courseId: req.body.id,
      courseName: req.body.name,
      courseDuration: req.body.duration
    });
    req.flash('message', `Felicidades, el curso ${req.body.name} ha sido creado!`);
    res.redirect('/courses');
  }
}
