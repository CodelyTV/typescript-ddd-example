import { Course } from '../../domain/Course';
export class GetCourseResponse {
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
  