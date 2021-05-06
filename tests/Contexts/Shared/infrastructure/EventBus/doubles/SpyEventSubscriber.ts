import { DomainEvent, DomainEventClass } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';

export class SpyEventSubscriber implements DomainEventSubscriber<DomainEvent> {
  publishedEvents: Array<DomainEvent> = [];

  constructor(private subscribeToClass: DomainEventClass) {}

  subscribedTo(): DomainEventClass[] {
    return [this.subscribeToClass];
  }

  async on(domainEvent: DomainEvent): Promise<void> {
    this.publishedEvents.push(domainEvent);
  }

  numberOfReceivedEvents() {
    return this.publishedEvents.length;
  }
}
