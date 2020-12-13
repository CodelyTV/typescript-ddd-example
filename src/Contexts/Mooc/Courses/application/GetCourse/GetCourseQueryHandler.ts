import { GetCourseQuery } from './GetCourseQuery';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseFinder } from './CourseFinder';
import { CourseResponse } from '../../../Shared/domain/Courses/application/CourseResponse';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Query } from '../../../../Shared/domain/Query';

export class GetCourseQueryHandler implements QueryHandler<GetCourseQuery, CourseResponse> {
    constructor(private courseFinder: CourseFinder) {}

    subscribedTo(): Query {
        return GetCourseQuery;
    }

    async handle(query: GetCourseQuery): Promise<CourseResponse> {
        const courseId = new CourseId(query.id);
        return this.courseFinder.run({ courseId });
    }
}
