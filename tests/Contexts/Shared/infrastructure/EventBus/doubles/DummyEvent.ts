import { DomainEvent } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';

export class DummyEvent extends DomainEvent {
  static readonly EVENT_NAME = 'dummy:event';

  readonly id: string;

  constructor(id: string) {
    super(DummyEvent.EVENT_NAME, id);
    this.id = id;
  }

  toPrimitive(): Object {
    return { id: this.id };
  }

  static fromPrimitives(id: string): DomainEvent {
    return new DummyEvent(id);
  }
}
