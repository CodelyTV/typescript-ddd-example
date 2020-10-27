import { BackofficeCourse } from './BackofficeCourse';

export interface BackofficeCourseRepository {
  searchAll(): Promise<Array<BackofficeCourse>>;
}
