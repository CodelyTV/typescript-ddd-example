import { CourseFinder as DomainCourseFinder } from '../../domain/CourseFinder';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { GetCourseResponse } from './GetCourseResponse';

export type Params = {
  courseId: CourseId;
};

export class CourseFinder {
  private courseFinder: DomainCourseFinder;

  constructor(courseFinder: DomainCourseFinder) {
    this.courseFinder = courseFinder;
  }

  async run({ courseId }: Params): Promise<GetCourseResponse> {
    const course = await this.courseFinder.run(courseId);
    return new GetCourseResponse(course);
  }
}
