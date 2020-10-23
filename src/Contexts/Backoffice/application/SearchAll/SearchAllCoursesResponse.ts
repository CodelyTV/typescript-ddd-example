import { BackofficeCourse } from '../../domain/BackofficeCourse';

export class SearchAllCoursesResponse {
  readonly courses: Array<BackofficeCourse>;

  constructor(courses: Array<BackofficeCourse>) {
    this.courses = courses;
  }
}
