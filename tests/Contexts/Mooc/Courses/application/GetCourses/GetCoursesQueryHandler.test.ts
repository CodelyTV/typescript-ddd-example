import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../../domain/CourseMother';
import { CoursesSearcher } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourses/CoursesSearcher';
import { GetCoursesQueryHandler } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourses/GetCoursesQueryHandler';
import { GetCoursesQuery } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourses/GetCoursesQuery';
import { CoursesResponse } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourses/CoursesResponse';

describe('GetCourse QueryHandler', () => {
  let repository: CourseRepositoryMock;
  let coursesSerarcher: CoursesSearcher;

  beforeEach(() => {
    repository = new CourseRepositoryMock();
    coursesSerarcher = new CoursesSearcher(repository);
  });


  it('should search all courses', async () => {
    const firstCourse = CourseMother.random();
    const secondCourse = CourseMother.random();
    const courses = [firstCourse, secondCourse];
    repository.returnOnGetAll(courses);

    const handler = new GetCoursesQueryHandler(new CoursesSearcher(repository));
    
    const query = new GetCoursesQuery();
    const response = await handler.handle(query);
    
    repository.assertGetAll();

    const expected = new CoursesResponse(courses);
    expect(expected).toEqual(response);
  });

  it('should get no one course', async () => {
    const handler = new GetCoursesQueryHandler(new CoursesSearcher(repository));
    
    const query = new GetCoursesQuery();
    const response = await handler.handle(query);
    
    repository.assertGetAll();

    const expected = new CoursesResponse([]);
    expect(expected).toEqual(response);
  });
});
