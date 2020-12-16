import EventBusMock from '../../__mocks__/EventBusMock';
import { LikeCourseCommandHandler } from '../../../../../../src/Contexts/Mooc/Courses/application/LikeCourse/LikeCourseCommandHandler';
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock';
import { CourseFinder } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseFinder';
import { CourseLiker } from '../../../../../../src/Contexts/Mooc/Courses/application/LikeCourse/CourseLiker';
import { LikeCourseCommandMother } from './LikeCourseCommandMother';
import { CourseMother } from '../../domain/CourseMother';
import { UserIdMother } from './UserIdMother';
import { CourseLikedDomainEvent } from '../../../../../../src/Contexts/Mooc/Courses/domain/CourseLikedDomainEvent';
import { Course } from '../../../../../../src/Contexts/Mooc/Courses/domain/Course';

let handler: LikeCourseCommandHandler;
let repository: CourseRepositoryMock;

describe('Like Course command handler tests', () => {
  beforeEach(() => {
    repository = new CourseRepositoryMock();
    const finder = new CourseFinder(repository);
    const liker = new CourseLiker(finder, repository);
    handler = new LikeCourseCommandHandler(liker);
  });
  it('Should like a video', async () => {
    //Given
    const course = CourseMother.random();
    const userId = UserIdMother.random();
    repository.returnOnSearch(course);
    const command = LikeCourseCommandMother.create(course.id.value, userId.value);

    // when
    await handler.handle(command);

    // then
    thenCourseHasBeenLiked(course, userId.value);
  });
});

function thenCourseHasBeenLiked(course: Course, userId: string): void {
  const likedCourseEvent = aLikedCourseDomainEvent(course.id.value, userId);
  course.record(likedCourseEvent);
  repository.assertLastSavedCourseEventIs(course);
}

function aLikedCourseDomainEvent(id: string, userId: string): CourseLikedDomainEvent {
  return new CourseLikedDomainEvent({
    id,
    userId
  });
}
