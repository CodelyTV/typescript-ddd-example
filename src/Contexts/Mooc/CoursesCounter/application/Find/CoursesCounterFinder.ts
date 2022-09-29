import { CoursesCounterNotExist } from '../../domain/CoursesCounterNotExist';
import { CoursesCounterRepository } from '../../domain/CoursesCounterRepository';

export class CoursesCounterFinder {
  constructor(private repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new CoursesCounterNotExist();
    }

    return counter.total.value;
  }
}
