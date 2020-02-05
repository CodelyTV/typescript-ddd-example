import { DomainEvent } from '../src/Contexts/Shared/domain/DomainEvent';

declare global {
  namespace jest {
    interface Matchers<R> {
      toPublish(a: DomainEvent): R;
    }
  }
}
