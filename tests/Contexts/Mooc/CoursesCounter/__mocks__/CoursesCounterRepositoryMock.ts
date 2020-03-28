import { CoursesCounterRepository } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterRepository';
import { CoursesCounter } from '../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter';
import { Nullable } from '../../../../../src/Contexts/Shared/domain/Nullable';

export class CoursesCounterRepositoryMock implements CoursesCounterRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private coursesCounter: Nullable<CoursesCounter> = null;

  async search(): Promise<Nullable<CoursesCounter>> {
    this.mockSearch();
    return this.coursesCounter;
  }

  async save(counter: CoursesCounter): Promise<void> {
    this.mockSave(counter);
  }

  returnOnSearch(counter: CoursesCounter) {
    this.coursesCounter = counter;
  }

  assertSearch() {
    expect(this.mockSearch).toHaveBeenCalled();
  }
}
