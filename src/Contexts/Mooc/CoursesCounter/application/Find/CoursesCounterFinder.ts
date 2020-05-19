import { CoursesCounterRepository } from '../../domain/CoursesCounterRepository';
import { CoursesCounterNotExist } from '../../domain/CoursesCounterNotExist';
import { CoursesCounterResponse } from './CoursesCounterResponse';

export class CoursesCounterFinder {
  constructor(private repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new CoursesCounterNotExist();
    }

    return new CoursesCounterResponse(counter.total.value);
  }
}
