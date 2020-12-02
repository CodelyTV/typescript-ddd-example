import { Params } from './../../../../../../src/Contexts/Mooc/Courses/application/GetCourse/CourseFinder';
import { CourseId } from '../../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

export class ParamsMother {
    static create(id: CourseId): Params {
        return { courseId: id };
    }
  }