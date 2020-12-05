import { CourseRepository } from '../../domain/CourseRepository';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { EventBus } from '../../../../Shared/domain/EventBus';
import { CourseName } from '../../../Shared/domain/Courses/CourseName';
import { CourseFinder } from '../../domain/CourseFinder';

type Params = {
  courseId: CourseId;
  courseName: CourseName;
};

export class CourseRenamer {
  private courseFinder: CourseFinder;
  private eventBus: EventBus;
  private repository: CourseRepository;

  constructor(courseFinder: CourseFinder, repository: CourseRepository, eventBus: EventBus) {
    this.courseFinder = courseFinder;
    this.eventBus = eventBus;
    this.repository = repository;
  }

  async run({ courseId, courseName }: Params): Promise<void> {
    const course = await this.courseFinder.run(courseId);
    course.rename(courseName);

    await this.repository.save(course);
    await this.eventBus.publish(course.pullDomainEvents());
  }
}