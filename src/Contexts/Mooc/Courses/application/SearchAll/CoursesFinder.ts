import { CourseRepository } from '../../domain/CourseRepository';
import { CoursesResponse } from './CoursesResponse';

export class CoursesFinder {
  constructor(private coursesRepository: CourseRepository) {}

  async run() {
    const courses = await this.coursesRepository.searchAll();

    return new CoursesResponse(courses);
  }
}
