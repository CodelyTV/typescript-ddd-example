import { CoursesCounterRepository } from '../domain/CoursesCounterRepository';
import { CoursesCounter } from '../domain/CoursesCounter';
import { CoursesCounterId } from '../domain/CoursesCounterId';
import { CoursesCounterTotal } from '../domain/CoursesCounterTotal';

export class InMemoryCoursesCounterRepository implements CoursesCounterRepository {
  private counter: CoursesCounter;
  constructor() {
    this.counter = new CoursesCounter(CoursesCounterId.random(), new CoursesCounterTotal(0), []);
  }

  async search(): Promise<CoursesCounter> {
    return this.counter;
  }

  async save(counter: CoursesCounter): Promise<void> {
    this.counter = counter;
  }
}
