import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';
import { BackofficeCourseResponse } from '../BackofficeCourseResponse';
import { BackofficeCoursesResponse } from '../BackofficeCoursesResponse';

export class CoursesFinder {
  constructor(private coursesRepository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.coursesRepository.searchAll();

    const backofficeCourseResponses = courses.map(BackofficeCourseResponse.fromAggregate);

    return new BackofficeCoursesResponse(backofficeCourseResponses);
  }
}
