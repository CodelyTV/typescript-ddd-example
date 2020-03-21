import { CreateCourseRequestMother } from '../application/CreateCourseRequestMother';
import { CourseMother } from './CourseMother';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';

describe('Course', () => {

  it('should return a new course instance', () => {
    const request = CreateCourseRequestMother.random();

    const course = CourseMother.fromRequest(request);

    expect(course.id.value).toBe(request.id);
    expect(course.name.value).toBe(request.name);
    expect(course.duration.value).toBe(request.duration);
  });

  it('should record a CourseCreatedDomainEvent after its creation', () => {
    const course = Course.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());

    const events = course.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('course.created');
  });
});
