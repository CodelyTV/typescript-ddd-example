import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { CourseCreatedDomainEvent } from '../../../Courses/domain/CourseCreatedDomainEvent';
import { CoursesCounterIncrementer } from './CoursesCounterIncrementer';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';

export class IncrementCoursesCounterOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): string[] {
    return [CourseCreatedDomainEvent.EVENT_NAME];
  }

  async on(domainEvent: CourseCreatedDomainEvent) {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId));
  }
}
