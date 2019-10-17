import CourseRepository from '../domain/CourseRepository';
import Course from '../domain/Course';
import * as fs from 'fs';
import BSON from 'bson';

export default class FileCourseRepository implements CourseRepository {
  private FILE_PATH = `${__dirname}/courses`;

  save(course: Course): void | Promise<void> {
    fs.writeFileSync(this.filePath(course.id), BSON.serialize(course));
  }

  search(id: string): Course {
    return fs.existsSync(this.filePath(id)) ? BSON.deserialize(fs.readFileSync(this.filePath(id))) : null;
  }

  private filePath(id: string): string {
    return `${this.FILE_PATH}.${id}.repo`;
  }
}
