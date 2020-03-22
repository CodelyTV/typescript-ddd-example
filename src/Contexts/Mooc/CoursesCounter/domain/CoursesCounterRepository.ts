import { CoursesCounter } from './CoursesCounter';

export interface CoursesCounterRepository {
  search(): Promise<CoursesCounter>;
  save(counter: CoursesCounter): Promise<void>;
}
