import Course from './Course';

export default interface CourseRepository {
  save(course: Course): Promise<void> | void;

  search(id: string): Promise<Course> | Course;
}
