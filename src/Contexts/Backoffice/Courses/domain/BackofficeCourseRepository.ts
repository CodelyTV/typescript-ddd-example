import { Criteria } from '../../../Shared/domain/criteria/Criteria';
import { BackofficeCourse } from './BackofficeCourse';

export interface BackofficeCourseRepository {
  save(course: BackofficeCourse): Promise<void>;
  searchAll(): Promise<Array<BackofficeCourse>>;
  matching(criteria: Criteria): Promise<Array<BackofficeCourse>>;
}
