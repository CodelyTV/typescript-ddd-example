import { Course } from '../../domain/Course';
import { CourseResponse } from '../../../Shared/domain/Courses/application/CourseResponse';
import { Nullable } from '../../../../Shared/domain/Nullable';
export class CoursesResponse {
    readonly data: CourseResponse[];
     
    constructor(courses: Nullable<Course[]>) {
        this.data = [];
        if (courses !== null) {
            courses.forEach(course => {
                this.data.push(new CourseResponse(course))
            }); 
        }       
    }
}
  