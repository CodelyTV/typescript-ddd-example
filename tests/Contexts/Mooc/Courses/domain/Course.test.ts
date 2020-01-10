import Course from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseId } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseId';
import { CourseName } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseName';
import { CourseDuration } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration';

describe('Course', () => {
  const courseId = new CourseId('any-id');
  const courseName = new CourseName('any-name');
  const courseDuration = new CourseDuration(20);

  it('should return a new course instance', () => {
    const course = Course.create(new CourseId('any-id'), new CourseName('any-name'), new CourseDuration(20));

    expect(course.id.equals(courseId)).toBe(true);
    expect(course.name.equals(courseName)).toBe(true);
    expect(course.duration.equals(courseDuration)).toBe(true);
  });

  it('should record a CourseCreatedDomainEvent after its creation', () => {
    const course = Course.create(new CourseId('any-id'), new CourseName('any-name'), new CourseDuration(20));

    const events = course.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('course.created');
  });
});
