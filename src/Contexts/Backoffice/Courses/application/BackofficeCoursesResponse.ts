import { BackofficeCourseResponse } from './BackofficeCourseResponse';

export class BackofficeCoursesResponse {
  readonly courses: Array<BackofficeCourseResponse>;

  constructor(courses: Array<BackofficeCourseResponse>) {
    this.courses = courses;
  }
}
