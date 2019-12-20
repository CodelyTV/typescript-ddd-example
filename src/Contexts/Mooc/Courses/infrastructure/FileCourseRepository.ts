import CourseRepository from '../domain/CourseRepository';
import Course from '../domain/Course';
import fs from 'fs';
import BSON from 'bson';
import { Nullable } from '../../../Shared/domain/Nullable';

export default class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  async save(course: Course): Promise<void> {
    const filePath = this.filePath(course.id);
    const data = BSON.serialize(course);

   return fs.writeFileSync(filePath, data);
  }

  async search(id: string): Promise<Nullable<Course>> {
    const filePath = this.filePath(id);
    const exists = fs.existsSync(filePath);

    return exists ? BSON.deserialize(fs.readFileSync(this.filePath(id))) : null;
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
