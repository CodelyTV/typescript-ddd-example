import { BackofficeCourse } from '../domain/BackofficeCourse';

export class BackofficeCoursesResponse {
  readonly courses: Array<BackofficeCourse>;

  constructor(courses: Array<BackofficeCourse>) {
    this.courses = courses;
  }
}
