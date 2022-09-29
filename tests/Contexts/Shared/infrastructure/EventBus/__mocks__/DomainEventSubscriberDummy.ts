import { DomainEvent, DomainEventClass } from '../../../../../../src/Contexts/Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../../../src/Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEventDummy } from './DomainEventDummy';

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
  static failsFirstTime() {
    return new DomainEventSubscriberDummy({ failsFirstTime: true });
  }

  static alwaysFails() {
    return new DomainEventSubscriberDummy({ alwaysFails: true });
  }

  private events: Array<DomainEvent>;
  private failsFirstTime = false;
  private alwaysFails = false;
  private alreadyFailed = false;

  constructor(params?: { failsFirstTime?: Boolean; alwaysFails?: Boolean }) {
    if (params?.failsFirstTime) {
      this.failsFirstTime = true;
    }
    if (params?.alwaysFails) {
      this.alwaysFails = true;
    }

    this.events = [];
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy];
  }

  async on(domainEvent: DomainEventDummy): Promise<void> {
    if (this.alwaysFails) {
      throw new Error();
    }

    if (!this.alreadyFailed && this.failsFirstTime) {
      this.alreadyFailed = true;
      throw new Error();
    }

    this.events.push(domainEvent);
  }

  async assertConsumedEvents(events: Array<DomainEvent>) {
    return new Promise((resolve: Function, reject: Function) => {
      setTimeout(() => {
        try {
          expect(this.events.length).toEqual(events.length);
          expect(this.events).toEqual(events);
          resolve();
        } catch (error: any) {
          reject(error);
        }
      }, 400);
    });
  }
}
