import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { Query } from '../../../../Shared/domain/Query';
import { CoursesResponse } from './CoursesResponse';
import { GetCoursesQuery } from './GetCoursesQuery';
import { CoursesSearcher } from './CoursesSearcher';

export class GetCoursesQueryHandler implements QueryHandler<GetCoursesQuery, CoursesResponse> {
    constructor(private coursesSearcher: CoursesSearcher) {}

    subscribedTo(): Query {
        return GetCoursesQuery;
    }

    async handle(query: GetCoursesQuery): Promise<CoursesResponse> {
        return this.coursesSearcher.run();
    }
}
