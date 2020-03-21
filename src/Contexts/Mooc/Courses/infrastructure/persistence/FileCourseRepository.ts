import { CourseRepository } from '../../domain/CourseRepository';
import { Course } from '../../domain/Course';
import fs from 'fs';
import BSON from 'bson';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';

export class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  async save(course: Course): Promise<void> {
    const filePath = this.filePath(course.id.value);
    const data = BSON.serialize(course);

    return fs.writeFileSync(filePath, data);
  }

  async search(id: CourseId): Promise<Nullable<Course>> {
    const filePath = this.filePath(id.value);
    const exists = fs.existsSync(filePath);

    return exists ? BSON.deserialize(fs.readFileSync(this.filePath(id.value))) : null;
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
