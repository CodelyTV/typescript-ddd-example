import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseNotFound } from '../../domain/CourseNotFound';
import { GetCourseResponse } from './GetCourseResponse';
import { Nullable } from '../../../../Shared/domain/Nullable';

type Params = {
  courseId: CourseId;
};

export class CourseFinder {
  private repository: CourseRepository;

  constructor(repository: CourseRepository) {
    this.repository = repository;
  }

  async run({ courseId }: Params): Promise<GetCourseResponse> {
    const course : Nullable<Course> = await this.repository.search(courseId);
    if (!course) {
      throw new CourseNotFound();
    }
    return new GetCourseResponse(course);
  }
}
