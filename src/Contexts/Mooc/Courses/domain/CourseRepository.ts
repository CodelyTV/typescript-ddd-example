import Course from './Course';
import { Nullable } from '../../../Shared/domain/Nullable';

export default interface CourseRepository {
  save(course: Course): Promise<void>;

  search(id: string): Promise<Nullable<Course>>;
}
