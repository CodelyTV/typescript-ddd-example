import { CourseFinder } from './../../../../../src/Contexts/Mooc/Courses/domain/CourseFinder';
import { CourseRepositoryMock } from '../__mocks__/CourseRepositoryMock';
import { CourseMother } from './CourseMother';
import { GetCourseResponse } from '../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseResponse';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNotFound } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseNotFound';


let repository: CourseRepositoryMock;
let finder: CourseFinder;


beforeEach(() => {
  repository = new CourseRepositoryMock();
  finder = new CourseFinder(repository);
});

it('should get a course', async () => {
  const course = CourseMother.random();
  const id = course.id;
  repository.returnOnSearch(course);
  const response = await finder.run(id);

  repository.assertSearch(id);
  expect(course).toEqual(response);
});

it('should throw an exception when courses counter does not exists', async () => {
  const id = CourseIdMother.random()
  await expect(finder.run(id)).rejects.toBeInstanceOf(CourseNotFound);
});
