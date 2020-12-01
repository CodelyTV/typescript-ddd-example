import { CourseFinder } from './../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/CourseFinder';
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../../domain/CourseMother';
import { GetCourseQuery } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseQuery';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { GetCourseQueryHandler } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseQueryHandler';
import { CourseNotFound } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseNotFound';
import { GetCourseResponse } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseResponse';

describe('GetCourse QueryHandler', () => {
  let repository: CourseRepositoryMock;

  beforeEach(() => {
    repository = new CourseRepositoryMock();
  });


  it('should find an existing courses counter', async () => {
    const course = CourseMother.random();
    const id = course.id;
    repository.returnOnSearch(course);

    const handler = new GetCourseQueryHandler(new CourseFinder(repository));
    
    const query = new GetCourseQuery({ id: id.value });
    const response = await handler.handle(query);
    
    repository.assertSearch(id);

    const expected = new GetCourseResponse(course);
    expect(expected).toEqual(response);
  });

  it('should throw an exception when courses counter does not exists', async () => {
    const handler = new GetCourseQueryHandler(new CourseFinder(repository));

    const id = CourseIdMother.random();
    const query = new GetCourseQuery({id : id.value});

    await expect(handler.handle(query)).rejects.toBeInstanceOf(CourseNotFound);
  });
});
