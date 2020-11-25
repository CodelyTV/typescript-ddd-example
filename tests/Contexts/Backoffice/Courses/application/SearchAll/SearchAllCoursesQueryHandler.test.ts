import { CoursesFinder } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchAll/CoursesFinder';
import { SearchAllCoursesQuery } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchAll/SearchAllCoursesQuery';
import { SearchAllCoursesQueryHandler } from '../../../../../../src/Contexts/Backoffice/Courses/application/SearchAll/SearchAllCoursesQueryHandler';
import { BackofficeCourseMother } from '../../domain/BackofficeCourseMother';
import { SearchAllCoursesResponseMother } from '../../domain/SearchAllCoursesResponseMother';
import { BackofficeCourseRepositoryMock } from '../../__mocks__/BackofficeCourseRepositoryMock';

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
