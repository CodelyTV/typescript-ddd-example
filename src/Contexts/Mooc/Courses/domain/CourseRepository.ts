import { Course } from './Course';

export interface CourseRepository {
  save(course: Course): Promise<void>;
  searchAll(): Promise<Array<Course>>;
}
