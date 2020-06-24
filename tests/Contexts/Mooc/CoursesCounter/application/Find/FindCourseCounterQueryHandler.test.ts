import { CoursesCounterFinder } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/CoursesCounterFinder';
import { CoursesCounterMother } from '../../domain/CoursesCounterMother';
import { CoursesCounterRepositoryMock } from '../../__mocks__/CoursesCounterRepositoryMock';
import { CoursesCounterResponseMother } from '../../domain/CoursesCounterResponseMother';
import { CoursesCounterNotExist } from '../../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterNotExist';
import { FindCoursesCounterQueryHandler } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQueryHandler';
import { FindCoursesCounterQuery } from '../../../../../../src/Contexts/Mooc/CoursesCounter/application/Find/FindCoursesCounterQuery';

describe('FindCourseCounter QueryHandler', () => {
  let repository: CoursesCounterRepositoryMock;

  beforeEach(() => {
    repository = new CoursesCounterRepositoryMock();
  });


  it('should find an existing courses counter', async () => {
    const counter = CoursesCounterMother.random();
    repository.returnOnSearch(counter);

    const handler = new FindCoursesCounterQueryHandler(new CoursesCounterFinder(repository));
    
    const query = new FindCoursesCounterQuery();
    const response = await handler.handle(query);
    
    repository.assertSearch();

    const expected = CoursesCounterResponseMother.create(counter.total);
    expect(expected).toEqual(response);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    const handler = new FindCoursesCounterQueryHandler(new CoursesCounterFinder(repository));

    const query = new FindCoursesCounterQuery();

    await expect(handler.handle(query)).rejects.toBeInstanceOf(CoursesCounterNotExist);
  });
});
