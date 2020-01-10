import { Nullable } from '../../../Shared/domain/Nullable';
import { Course } from './Course';

export interface CourseRepository {
  save(course: Course): Promise<void>;

  search(id: string): Promise<Nullable<Course>>;
}
