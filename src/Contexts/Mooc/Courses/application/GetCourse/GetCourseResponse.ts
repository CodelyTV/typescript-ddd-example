import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseName } from '../../../Shared/domain/Courses/CourseName';
import { Course } from '../../domain/Course';
import { CourseDuration } from '../../domain/CourseDuration';

export class GetCourseResponse {
    readonly id: CourseId;
    readonly name: CourseName;
    readonly duration: CourseDuration;
     
    constructor(course: Course) {
        this.id = course.id;
        this.name = course.name;
        this.duration = course.duration;
    }
}
  