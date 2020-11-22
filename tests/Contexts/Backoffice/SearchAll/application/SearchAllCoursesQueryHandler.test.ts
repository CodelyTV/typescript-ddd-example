import { SearchAllCoursesQueryHandler } from '../../../../../src/Contexts/Backoffice/SearchAll/application/SearchAllCoursesQueryHandler';
import { CoursesFinder } from '../../../../../src/Contexts/Backoffice/SearchAll/application/CoursesFinder';
import { SearchAllCoursesQuery } from '../../../../../src/Contexts/Backoffice/SearchAll/application/SearchAllCoursesQuery';
import { BackofficeCourseRepositoryMock } from '../../Shared/__mocks__/BackofficeCourseRepositoryMock';
import { BackofficeCourseMother } from '../../Courses/domain/BackofficeCourseMother';
import { SearchAllCoursesResponseMother } from '../domain/SearchAllCoursesResponseMother';

describe('SearchAllCourses QueryHandler', () => {
  let repository: BackofficeCourseRepositoryMock;

  beforeEach(() => {
    repository = new BackofficeCourseRepositoryMock();
  });

  it('should find an existing courses counter', async () => {
    const courses = [BackofficeCourseMother.random(), BackofficeCourseMother.random(), BackofficeCourseMother.random()];
    repository.returnOnSearchAll(courses);

    const handler = new SearchAllCoursesQueryHandler(new CoursesFinder(repository));

    const query = new SearchAllCoursesQuery();
    const response = await handler.handle(query);

    repository.assertSearchAll();

    const expected = SearchAllCoursesResponseMother.create(courses);
    expect(expected).toEqual(response);
  });
});
