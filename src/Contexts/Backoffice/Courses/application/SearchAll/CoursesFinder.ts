import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse';

export class CoursesFinder {
  constructor(private coursesRepository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.coursesRepository.searchAll();

    return new BackofficeCoursesResponse(courses);
  }
}
