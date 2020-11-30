import { GetCourseQuery } from './GetCourseQuery';
import { CourseId } from '../../../Shared/domain/Courses/CourseId';
import { CourseFinder } from './CourseFinder';
import { GetCourseResponse } from './GetCourseResponse';
import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Query } from '../../../../Shared/domain/Query';

export class GetCourseQueryHandler implements QueryHandler<GetCourseQuery, GetCourseResponse> {
    constructor(private courseFinder: CourseFinder) {}

    subscribedTo(): Query {
        return GetCourseQuery;
    }

    async handle(query: GetCourseQuery): Promise<GetCourseResponse> {
        const courseId = new CourseId(query.id);
        return this.courseFinder.run({ courseId });
    }
}
