import { EventBus } from '../../../Shared/domain/EventBus';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { Course } from '../domain/Course';
import { CourseDuration } from '../domain/CourseDuration';
import { CourseName } from '../domain/CourseName';
import { CourseRepository } from '../domain/CourseRepository';

type Params = {
  courseId: CourseId;
  courseName: CourseName;
  courseDuration: CourseDuration;
};

export class CourseCreator {
  private repository: CourseRepository;
  private eventBus: EventBus;

  constructor(repository: CourseRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({ courseId, courseName, courseDuration }: Params): Promise<void> {
    const course = Course.create(courseId, courseName, courseDuration);

    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
