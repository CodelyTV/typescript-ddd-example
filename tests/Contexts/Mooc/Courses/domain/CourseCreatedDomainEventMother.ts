import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';

export class CourseCreatedDomainEventMother {
  static create({
    id,
    eventId,
    duration,
    name,
    occurredOn
  }: {
    id: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id,
      eventId,
      duration,
      name,
      occurredOn
    });
  }

  static fromCourse(course: Course): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      id: course.id.value,
      duration: course.duration.value,
      name: course.name.value
    });
  }

}
