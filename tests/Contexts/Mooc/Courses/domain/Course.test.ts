import { CreateCourseCommandMother } from '../application/CreateCourseCommandMother';
import { CourseMother } from './CourseMother';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseIdMother } from '../../Shared/domain/Courses/CourseIdMother';
import { CourseNameMother } from './CourseNameMother';
import { CourseDurationMother } from './CourseDurationMother';

describe('Course', () => {

  it('should return a new course instance', () => {
    const command = CreateCourseCommandMother.random();

    const course = CourseMother.fromCreateCommand(command);

    expect(course.id.value).toBe(command.id);
    expect(course.name.value).toBe(command.name);
    expect(course.duration.value).toBe(command.duration);
  });

  it('should record a CourseCreatedDomainEvent after its creation', () => {
    const course = Course.create(CourseIdMother.random(), CourseNameMother.random(), CourseDurationMother.random());

    const events = course.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('course.created');
  });

  it('should record a CourseRenamedDomainEvent after rename', () => {
    const command = CreateCourseCommandMother.random();
    const course = CourseMother.fromCreateCommand(command);
    const oldName = course.name;
    const newName = CourseNameMother.random();
    course.rename(newName);

    const events = course.pullDomainEvents();

    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe('course.renamed');
  });
});
