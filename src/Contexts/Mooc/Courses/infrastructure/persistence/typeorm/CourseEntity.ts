import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../../Shared/infrastructure/persistence/typeorm/ValueObjectTransformer';
import { CourseId } from '../../../../Shared/domain/Courses/CourseId';
import { Course } from '../../../domain/Course';
import { CourseDuration } from '../../../domain/CourseDuration';
import { CourseName } from '../../../domain/CourseName';

export const CourseEntity = new EntitySchema<Course>({
  name: 'Course',
  tableName: 'courses',
  target: Course,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CourseId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(CourseName)
    },
    duration: {
      type: String,
      transformer: ValueObjectTransformer(CourseDuration)
    }
  }
});
