import { Query } from './Query';
import { Response } from './Response';

export interface QueryHandler<T extends Query, R extends Response> {
  subscribedTo(): Query;
  handle(query: T): Promise<R>;
}
