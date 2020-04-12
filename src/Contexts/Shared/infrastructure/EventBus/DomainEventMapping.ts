import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class DomainEventMapping {
  mapping: any;

  constructor(mapping: any) {
    this.mapping = mapping.reduce((prev: any, subscriber: DomainEventSubscriber<any>) => {
      subscriber.subscribedTo().forEach(event => {
        prev[event.EVENT_NAME] = event;
      });
      return prev;
    }, {});
  }

  for(name: string) {
    if (!this.mapping[name]) {
      throw new Error(`The Domain Event Class for ${name} doesn't exists or have no subscribers`);
    }
    return this.mapping[name];
  }
}
