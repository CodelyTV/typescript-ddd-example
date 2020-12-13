import { BackofficeCourseRepository } from '../../domain/BackofficeCourseRepository';
import { SearchAllCoursesResponse } from './SearchAllCoursesResponse';

export class CoursesFinder {
  constructor(private coursesRepository: BackofficeCourseRepository) {}

  async run() {
    const courses = await this.coursesRepository.searchAll();

    return new SearchAllCoursesResponse(courses);
  }
}
