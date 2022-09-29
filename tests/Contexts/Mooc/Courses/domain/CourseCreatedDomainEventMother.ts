import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';

export class CourseCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    duration,
    name,
    occurredOn
  }: {
    aggregateId: string;
    eventId?: string;
    duration: string;
    name: string;
    occurredOn?: Date;
  }): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId,
      eventId,
      duration,
      name,
      occurredOn
    });
  }

  static fromCourse(course: Course): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId: course.id.value,
      duration: course.duration.value,
      name: course.name.value
    });
  }
}
