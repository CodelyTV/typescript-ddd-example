import { CoursesCounterFinder } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { FindCoursesCounterQuery } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';
import { FindCoursesCounterQueryHandler } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQueryHandler';
import { CoursesCounterNotExist } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';

describe('FindCoursesCounterQueryHandler', () => {
  let repository: CoursesCounterRepositoryMock;

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock();
  });

  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random();
    repository.returnOnSearch(counter);
    const finder = new CoursesCounterFinder(repository);
    const handler = new FindCoursesCounterQueryHandler(finder);

    const response = await handler.handle(new FindCoursesCounterQuery());

    repository.assertSearch();
    expect(counter.total.value).toEqual(response.total);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    const finder = new CoursesCounterFinder(repository);
    const handler = new FindCoursesCounterQueryHandler(finder);

    await expect(handler.handle(new FindCoursesCounterQuery())).rejects.toBeInstanceOf(CoursesCounterNotExist);
  });
});
