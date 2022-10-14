import { Course } from '../../domain/Course';

interface CourseResponse {
  id: string;
  name: string;
  duration: string;
}

export class CoursesResponse {
  public readonly courses: Array<CourseResponse>;

  constructor(courses: Array<Course>) {
    this.courses = courses.map(course => course.toPrimitives());
  }
}
