import { CourseId } from './../../../Shared/domain/Courses/CourseId';
import { CourseFinder } from '../../domain/CourseFinder';
import { UserId } from '../../domain/UserId';
import { CourseRepository } from '../../domain/CourseRepository';

type Params = {
  courseId: CourseId;
  userId: UserId;
};

export class CourseLiker {
  constructor(private courseFinder: CourseFinder, private repository: CourseRepository) {}

  async run({ courseId, userId }: Params): Promise<void> {
    const course = await this.courseFinder.run(courseId);

    course.like(userId);

    await this.repository.save(course);
  }
}
