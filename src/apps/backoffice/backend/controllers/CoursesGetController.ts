import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SearchAllCoursesQuery } from '../../../../Contexts/Backoffice/Courses/application/SearchAll/SearchAllCoursesQuery';
import { SearchAllCoursesResponse } from '../../../../Contexts/Backoffice/Courses/application/SearchAll/SearchAllCoursesResponse';
import { BackofficeCourse } from '../../../../Contexts/Backoffice/Courses/domain/BackofficeCourse';
import { QueryBus } from '../../../../Contexts/Shared/domain/QueryBus';
import { Controller } from './Controller';

export class CoursesGetController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(_req: Request, res: Response) {
    const query = new SearchAllCoursesQuery();
    const queryResponse: SearchAllCoursesResponse = await this.queryBus.ask(query);

    res.header('Access-Control-Allow-Origin', '*');
    res.status(httpStatus.OK).send(this.toResponse(queryResponse.courses));
  }

  private toResponse(courses: Array<BackofficeCourse>) {
    return courses.map(course => ({
      id: course.id.toString(),
      duration: course.duration.toString(),
      name: course.name.toString()
    }));
  }
}
