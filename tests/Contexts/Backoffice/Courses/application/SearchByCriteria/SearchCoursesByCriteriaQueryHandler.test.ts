import { CoursesByCriteriaSearcher } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchByCriteria/CoursesByCriteriaSearcher';
import { SearchCoursesByCriteriaQuery } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchByCriteria/SearchCoursesByCriteriaQuery';
import { SearchCoursesByCriteriaQueryHandler } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchByCriteria/SearchCoursesByCriteriaQueryHandler';
import { OrderTypes } from '../../../../../../src/Contexts/Shared/domain/criteria/OrderType';
import { BackofficeCourseMother } from '../../domain/BackofficeCourseMother';
import { SearchCoursesByCriteriaResponseMother } from '../../domain/SearchCoursesByCriteriaResponseMother';
import { BackofficeCourseRepositoryMock } from '../../__mocks__/BackofficeCourseRepositoryMock';

describe('SearchAllCourses QueryHandler', () => {
  let repository: BackofficeCourseRepositoryMock;

  beforeEach(() => {
    repository = new BackofficeCourseRepositoryMock();
  });

  it('should find courses filter by criteria', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random(), BackofficeCourseMother.random()];
    repository.returnMatching(courses);

    const handler = new SearchCoursesByCriteriaQueryHandler(new CoursesByCriteriaSearcher(repository));

    const filterName: Map<string, string> = new Map([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'DDD']
    ]);
    const filterDuration: Map<string, string> = new Map([
      ['field', 'duration'],
      ['operator', 'CONTAINS'],
      ['value', 'minutes']
    ]);

    const filters: Array<Map<string, string>> = new Array(filterName, filterDuration);

    const query = new SearchCoursesByCriteriaQuery(filters);
    const response = await handler.handle(query);

    const expected = SearchCoursesByCriteriaResponseMother.create(courses);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });

  it('should find courses filter by criteria with order, limit and offset', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random(), BackofficeCourseMother.random()];
    repository.returnMatching(courses);

    const handler = new SearchCoursesByCriteriaQueryHandler(new CoursesByCriteriaSearcher(repository));

    const filterName: Map<string, string> = new Map([
      ['field', 'name'],
      ['operator', 'CONTAINS'],
      ['value', 'DDD']
    ]);
    const filterDuration: Map<string, string> = new Map([
      ['field', 'duration'],
      ['operator', 'CONTAINS'],
      ['value', 'minutes']
    ]);

    const filters: Array<Map<string, string>> = new Array(filterName, filterDuration);
    const orderBy = 'name';
    const orderType = OrderTypes.ASC;

    const query = new SearchCoursesByCriteriaQuery(filters, orderBy, orderType, 10, 1);
    const response = await handler.handle(query);

    const expected = SearchCoursesByCriteriaResponseMother.create(courses);
    repository.assertMatchingHasBeenCalledWith();
    expect(expected).toEqual(response);
  });
});
