
import { CourseRenamer } from '../../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/CourseRenamer';
import { CourseFinder } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseFinder';
import { CourseNameMother } from '../../domain/CourseNameMother';
import { CourseMother } from '../../domain/CourseMother';
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import EventBusMock from '../../__mocks__/EventBusMock';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { CourseNotFound } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseNotFound';

let repository: CourseRepositoryMock;
let finder: CourseFinder;
let renamer: CourseRenamer;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CourseRepositoryMock();
  finder = new CourseFinder(repository);
  renamer = new CourseRenamer(finder, repository, eventBus);
});

it('should rename a valid course', async () => {
  const courseBefore = CourseMother.random();
  const { id, duration, description } = courseBefore;
  const newName = CourseNameMother.random();
  const renamedCourse = CourseMother.create(id, newName, duration, description);

  repository.returnOnSearch(courseBefore);

  await renamer.run({ courseId: id, courseName: newName})
  
  repository.assertSearch(id);
  repository.assertLastSavedCourseIs(renamedCourse);
});

it('should get a not found exception', async () => {
  const params = { courseId: CourseIdMother.random(), courseName: CourseNameMother.random()};
  await expect(renamer.run(params)).rejects.toBeInstanceOf(CourseNotFound);
});
