import { GetCourseQuery } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseQuery';
import { GetCourseRequestMother } from './GetCourseRequestMother';

export class GetCourseQueryMother {
  static random(): GetCourseQuery {
    const getCourseRequest = GetCourseRequestMother.random()
    return new GetCourseQuery(getCourseRequest);
  }

  static create(id: string): GetCourseQuery {
    const getCourseRequest = GetCourseRequestMother.create(id)
    return new GetCourseQuery(getCourseRequest)
  }
}
