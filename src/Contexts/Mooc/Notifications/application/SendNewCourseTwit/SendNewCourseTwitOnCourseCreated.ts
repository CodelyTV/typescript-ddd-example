import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { CourseCreatedDomainEvent } from '../../domain/CourseCreatedDomainEvent';
import SendNewCourseTwit from './SendNewCourseTwit';
import { CourseName } from '../../../Shared/domain/Courses/CourseName';

export default class SendNewCourseTweetOnCourseCreated implements DomainEventSubscriber<CourseCreatedDomainEvent> {
  constructor(private sendNewCourseTwit: SendNewCourseTwit) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent];
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    const courseName = new CourseName(domainEvent.name);
    await this.sendNewCourseTwit.run(courseName);
  }
}
