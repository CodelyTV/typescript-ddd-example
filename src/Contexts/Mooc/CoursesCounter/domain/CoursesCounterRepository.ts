import { CoursesCounter } from './CoursesCounter';
import { Nullable } from '@/Contexts/Shared/domain/Nullable';

export interface CoursesCounterRepository {
  search(): Promise<Nullable<CoursesCounter>>;
  save(counter: CoursesCounter): Promise<void>;
}
