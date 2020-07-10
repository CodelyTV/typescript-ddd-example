import { Query } from './Query';

export class QueryNotRegisteredError extends Error {
  constructor(query: Query) {
    super(`The query <${query.constructor.name}> hasn't a query handler associated`);
  }
}
