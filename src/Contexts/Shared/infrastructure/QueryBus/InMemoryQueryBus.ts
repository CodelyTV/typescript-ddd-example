import { Query } from '../../domain/Query';
import { Response } from '../../domain/Response';
import { QueryBus } from './../../domain/QueryBus';
import { QueryHandlers } from './QueryHandlers';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlers) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.get(query);

    return (await handler.handle(query)) as Promise<R>;
  }
}
