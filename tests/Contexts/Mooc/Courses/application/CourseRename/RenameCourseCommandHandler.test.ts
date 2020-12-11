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
import { RenameCourseCommand } from '../../../../../../src/Contexts/Mooc/Courses/application/RenameCourse/RenameCourseCommand';
import { CourseDuration } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';
import { CourseName } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseName';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { CourseDescriptionMother } from '../../domain/CourseDescriptionMother';
import { CourseDescription } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseDescription';

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
  const name = CourseNameMother.create(command.name);
  const oldName = CourseNameMother.random();
  const duration = CourseDurationMother.random();
  const description = CourseDescriptionMother.random();
  const courseBefore = CourseMother.create(id, oldName, duration, description);
  repository.returnOnSearch(courseBefore);
  
  await whenRenameCourseIsInvoked(command);
  thenTheCourseShouldBeRenamed(id, name, duration, description);
});

it('should get an exception', async () => {
    const command = RenameCourseCommandMother.random();  
    await expect(handler.handle(command)).rejects.toBeInstanceOf(CourseNotFound);    
});

async function whenRenameCourseIsInvoked(command: RenameCourseCommand) : Promise<void> {
  await handler.handle(command);
}

function thenTheCourseShouldBeRenamed(id: CourseId, name: CourseName, duration: CourseDuration, description: CourseDescription) : void {
  const renamedCourse = CourseMother.create(id, name, duration, description);
  repository.assertSearch(id);
  repository.assertLastSavedCourseIs(renamedCourse);
}