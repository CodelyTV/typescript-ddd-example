import { CourseRepository } from '../domain/CourseRepository';
import { Course } from '../domain/Course';
import { CreateCourseRequest } from './CreateCourseRequest';
import { CourseId } from '../../Shared/domain/Courses/CourseId';
import { CourseName } from '../domain/CourseName';
import { CourseDuration } from '../domain/CourseDuration';
import { EventBus } from '../../../Shared/domain/EventBus';

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
    const course = Course.create(
      courseId,
      courseName,
      courseDuration
    );

    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
