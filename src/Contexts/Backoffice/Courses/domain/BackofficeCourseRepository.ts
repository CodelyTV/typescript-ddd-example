import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { BackofficeCourse } from './BackofficeCourse';

export interface BackofficeCourseRepository {
  searchAll(): Promise<Array<BackofficeCourse>>;
  save(course: BackofficeCourse): Promise<void>;
  matching(criteria: Criteria): Promise<Array<BackofficeCourse>>;
}
