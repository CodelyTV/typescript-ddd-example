import { CourseFinder } from './../../../../../../src/Contexts/Mooc/Courses/domain/CourseFinder';
import { RenameCourseCommandHandler } from '../../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommandHandler';
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import { CourseRenamer } from '../../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/CourseRenamer';
import EventBusMock from '../../__mocks__/EventBusMock';
import { RenameCourseCommandMother } from './RenameCourseCommandMother';
import { CourseMother } from '../../domain/CourseMother';
import { CourseNameMother } from '../../domain/CourseNameMother';
import { CourseDurationMother } from '../../domain/CourseDurationMother';
import { CourseIdMother } from '../../../Shared/domain/Courses/CourseIdMother';
import { CourseNotFound } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseNotFound';

let repository: CourseRepositoryMock;
let handler: RenameCourseCommandHandler;

const eventBus = new EventBusMock();

beforeEach(() => {
  repository = new CourseRepositoryMock();
  const finder = new CourseFinder(repository);
  const renamer = new CourseRenamer(finder, repository, eventBus);
  handler = new RenameCourseCommandHandler(renamer);
});

it('should rename a course', async () => {
  const command = RenameCourseCommandMother.random();
  const id = CourseIdMother.create(command.id);
  const oldName = CourseNameMother.random();
  const name = CourseNameMother.create(command.name);
  const duration = CourseDurationMother.random();
  const courseBefore = CourseMother.create(id, oldName, duration);
  const renamedCourse = CourseMother.create(id, name, duration);

  repository.returnOnSearch(courseBefore);
  await handler.handle(command);
  repository.assertSearch(id);
  repository.assertLastSavedCourseIs(renamedCourse);
});

it('should get an exception', async () => {
    const command = RenameCourseCommandMother.random();  
    await expect(handler.handle(command)).rejects.toBeInstanceOf(CourseNotFound);    
});