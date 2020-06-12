import { CoursesCounter } from './CoursesCounter';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface CoursesCounterRepository {
  search(): Promise<Nullable<CoursesCounter>>;
  save(counter: CoursesCounter): Promise<void>;
}
