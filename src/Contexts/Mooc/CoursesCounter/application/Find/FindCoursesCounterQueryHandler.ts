import { QueryHandler } from '@/Contexts/Shared/domain/QueryHandler';
import { FindCoursesCounterQuery } from './FindCoursesCounterQuery';
import { FindCoursesCounterResponse } from './FindCoursesCounterResponse';
import { Query } from '@/Contexts/Shared/domain/Query';
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
