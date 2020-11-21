import { CoursesCounterRepository } from '../../domain/CoursesCounterRepository';
import { CoursesCounterNotExist } from '../../domain/CoursesCounterNotExist';
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse';

export class CoursesCounterFinder {
  constructor(private repository: CoursesCounterRepository) {}

  async run() {
    const counter = await this.repository.search();
    if (!counter) {
      throw new CoursesCounterNotExist();
    }

    return new FindCoursesCounterResponse(counter.total.value);
  }
}
