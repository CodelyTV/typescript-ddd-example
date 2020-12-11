import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseDuration } from '../../domain/CourseDuration';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { CourseName } from '../../../Shared/domain/Courses/CourseName';
import { CourseDescription } from '../../domain/CourseDescription';

type Params = {
  courseId: CourseId;
  courseName: CourseName;
  courseDuration: CourseDuration;
  courseDescription: CourseDescription
};

export class CourseCreator {
  private repository: CourseRepository;
  private eventBus: EventBus;

  constructor(repository: CourseRepository, eventBus: EventBus) {
    this.repository = repository;
    this.eventBus = eventBus;
  }

  async run({ courseId, courseName, courseDuration, courseDescription }: Params): Promise<void> {
    const course = Course.create(
      courseId,
      courseName,
      courseDuration,
      courseDescription
    );

    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}
