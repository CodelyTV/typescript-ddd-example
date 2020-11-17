import { BackofficeCourse } from './BackofficeCourse';

export interface BackofficeCourseRepository {
  searchAll(): Promise<Array<BackofficeCourse>>;
  save(course: BackofficeCourse): Promise<void>;
}
