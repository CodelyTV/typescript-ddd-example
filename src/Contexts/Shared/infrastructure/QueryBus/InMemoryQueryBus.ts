import { Query } from '../../domain/Query';
import { Response } from '../../domain/Response';
import { QueryBus } from './../../domain/QueryBus';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }
}
