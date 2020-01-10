import CourseRepository from '../domain/CourseRepository';
import Course from '../domain/Course';
import { CourseId } from '../domain/CourseId';
import { CourseName } from '../domain/CourseName';
import { CourseDuration } from '../domain/CourseDuration';
import { EventBus } from '../../../Shared/domain/EventBus';

export default class CourseCreator {
  private repository: CourseRepository;
  private eventBus: EventBus;

  constructor(repository: CourseRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(id: CourseId, name: CourseName, duration: CourseDuration): Promise<void> {
    const course = new Course(id, name, duration);

    await this.repository.save(course);

    this.eventBus.publish(course.pullDomainEvents());
  }
}
