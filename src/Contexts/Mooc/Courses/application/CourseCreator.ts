import { CourseRepository } from '../domain/CourseRepository';
import { Course } from '../domain/Course';
import { CreateCourseRequest } from './CreateCourseRequest';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseName } from '../domain/CourseName';
import { CourseDuration } from '../domain/CourseDuration';
import { EventBus } from '../../../Shared/domain/EventBus';

export class CourseCreator {
  private repository: CourseRepository;
  private eventBus: EventBus;

  constructor(repository: CourseRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run(request: CreateCourseRequest): Promise<void> {
    const course = new Course(
      new CourseId(request.id),
      new CourseName(request.name),
      new CourseDuration(request.duration)
    );

    await this.repository.save(course);

    this.eventBus.publish(course.pullDomainEvents());
  }
}
