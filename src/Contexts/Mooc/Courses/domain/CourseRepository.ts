import { Nullable } from '../../../Shared/domain/Nullable';
import { Course } from './Course';
import { CourseId } from '../../Shared/domain/Courses/CourseId';

export interface CourseRepository {
  save(course: Course): Promise<void>;

  search(id: CourseId): Promise<Nullable<Course>>;
}
