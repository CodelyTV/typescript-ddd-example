import { QueryHandler } from '../../../../Shared/domain/QueryHandler';
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery';
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse';
import { Query } from '../../../../Shared/domain/Query';
import { CoursesCounterFinder } from './CoursesCounterFinder';

export class FindCoursesCounterQueryHandler
  implements QueryHandler<FindCoursesCounterQuery, FindCoursesCounterResponse>
{
  constructor(private finder: CoursesCounterFinder) {}

  subscribedTo(): Query {
    return FindCoursesCounterQuery;
  }

  async handle(_query: FindCoursesCounterQuery): Promise<FindCoursesCounterResponse> {
    const counter = await this.finder.run();
    return new FindCoursesCounterResponse(counter);
  }
}
