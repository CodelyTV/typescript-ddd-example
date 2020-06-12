import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';
import { UuidMother } from '../../../../Shared/domain/UuidMother';

export class CourseIdMother {
  static create(value: string): CourseId {
    return new CourseId(value);
  }

  static creator() {
    return () => CourseIdMother.random();
  }

  static random(): CourseId {
    return this.create(UuidMother.random());
  }
}
