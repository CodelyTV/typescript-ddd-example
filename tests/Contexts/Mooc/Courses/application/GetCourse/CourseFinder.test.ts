import { CourseFinder } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/CourseFinder';
import { CourseFinder as DomainCourseFinder } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseFinder';
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import { CourseMother } from '../../domain/CourseMother';
import { GetCourseResponse } from '../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/GetCourseResponse';
import { ParamsMother } from './ParamsMother';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { CourseNotFound } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseNotFound';

let repository: CourseRepositoryMock;
let finder: CourseFinder;
let domainFinder: DomainCourseFinder;

beforeEach(() => {
  repository = new CourseRepositoryMock();
  domainFinder = new DomainCourseFinder(repository);
  finder = new CourseFinder(domainFinder);
});

it('should get a course', async () => {
  const course = CourseMother.random();
  const id = course.id;
  repository.returnOnSearch(course);
  const params = ParamsMother.create(id);
  const response = await finder.run(params);

  repository.assertSearch(id);
  const expected = new GetCourseResponse(course);
  expect(expected).toEqual(response);
});

it('should throw an exception when courses counter does not exists', async () => {
  const id = CourseIdMother.random()
  const params = ParamsMother.create(id);
  await expect(finder.run(params)).rejects.toBeInstanceOf(CourseNotFound);
});
