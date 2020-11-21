import { Query } from '../../../../../src/Contexts/Shared/domain/Query';
import { QueryHandlersInformation } from '../../../../../src/Contexts/Shared/infrastructure/QueryBus/QueryHandlersInformation';
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

  async handle(query: HandledQuery): Promise<Response> {return {};}
}

describe('InMemoryQueryBus', () => {
  it('throws an error if dispatches a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlersInformation = new QueryHandlersInformation([]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    let exception = null;

    try {
      await queryBus.ask(unhandledQuery);
    } catch (error) {
      exception = error;
    }

    expect(exception).toBeInstanceOf(QueryNotRegisteredError);
    expect(exception.message).toBe(`The query <UnhandledQuery> hasn't a query handler associated`);
  });

  it('accepts a query with handler', async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlersInformation = new QueryHandlersInformation([myQueryHandler]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    await queryBus.ask(handledQuery);
  });
});
