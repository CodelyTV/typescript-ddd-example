import { BackofficeCourse } from '../domain/BackofficeCourse';

interface BackofficeCourseResponse {
  id: string;
  name: string;
  duration: string;
}

export class BackofficeCoursesResponse {
  public readonly courses: Array<BackofficeCourseResponse>;

  constructor(courses: Array<BackofficeCourse>) {
    this.courses = courses.map(course => course.toPrimitives());
  }
}
