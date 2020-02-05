import { Course } from '../../../domain/Course';
import { EntitySchema, ValueTransformer } from 'typeorm';
import { CourseName } from '../../../domain/CourseName';
import { CourseDuration } from '../../../domain/CourseDuration';
import { CourseId } from '../../../../Shared/domain/Courses/CourseId';

export const CourseEntity = new EntitySchema<Course>({
  name: 'course',
  tableName: 'courses',
  target: Course,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: {
        to: (value: CourseId): string => value.value,
        from: (value: string): CourseId => new CourseId(value)
      }
    },
    name: {
      type: String,
      transformer: {
        to: (value: CourseName): string => value.value,
        from: (value: string): CourseName => new CourseName(value)
      }
    },
    duration: {
      type: String,
      transformer: {
        to: (value: CourseDuration): string => value.value,
        from: (value: string): CourseDuration => new CourseDuration(value)
      }
    }
  }
});
