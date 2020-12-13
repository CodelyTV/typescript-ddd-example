import { Course } from '../../../../Courses/domain/Course';
export class CourseResponse {
    readonly id: string;
    readonly name: string;
    readonly duration: string;
    readonly description: string;
     
    constructor(course: Course) {
        this.id = course.id.value;
        this.name = course.name.value;
        this.duration = course.duration.value;
        this.description = course.description.value;
    }
}
  