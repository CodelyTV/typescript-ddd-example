import { EventBus } from '../../../../Shared/domain/EventBus';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { Course } from '../../domain/Course';
import { CourseDuration } from '../../domain/CourseDuration';
import { CourseName } from '../../domain/CourseName';
import { CourseRepository } from '../../domain/CourseRepository';

export class CourseCreator {
  constructor(private repository: CourseRepository, private eventBus: EventBus) {}

  async run(params: { id: CourseId; name: CourseName; duration: CourseDuration }): Promise<void> {
    const course = Course.create(params.id, params.name, params.duration);
    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
