import { Query } from '../../../../../src/Contexts/Shared/domain/Query';
import { QueryHandlers } from '../../../../../src/Contexts/Shared/infrastructure/QueryBus/QueryHandlers';
import { QueryNotRegisteredError } from '../../../../../src/Contexts/Shared/domain/QueryNotRegisteredError';
import { QueryHandler } from '../../../../../src/Contexts/Shared/domain/QueryHandler';
import { Response } from '../../../../../src/Contexts/Shared/domain/Response';
import { InMemoryQueryBus } from '../../../../../src/Contexts/Shared/infrastructure/QueryBus/InMemoryQueryBus';

class UnhandledQuery extends Query {
  static QUERY_NAME = 'unhandled.query';
}

class HandledQuery extends Query {
  static QUERY_NAME = 'handled.query';
}

class MyQueryHandler implements QueryHandler<Query, Response> {
  subscribedTo(): HandledQuery {
    return HandledQuery;
  }

  async handle(query: HandledQuery): Promise<Response> {
    return {};
  }
}

describe('InMemoryQueryBus', () => {
  it('throws an error if dispatches a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlers = new QueryHandlers([]);
    const queryBus = new InMemoryQueryBus(queryHandlers);

    expect(queryBus.ask(unhandledQuery)).rejects.toBeInstanceOf(QueryNotRegisteredError);
  });

  it('accepts a query with handler', async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlers = new QueryHandlers([myQueryHandler]);
    const queryBus = new InMemoryQueryBus(queryHandlers);

    await queryBus.ask(handledQuery);
  });
});
