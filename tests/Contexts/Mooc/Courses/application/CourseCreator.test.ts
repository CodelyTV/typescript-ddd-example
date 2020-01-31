import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { AssertionError } from 'assert';
import { DomainEvent } from '../../../../../src/Contexts/Shared/domain/DomainEvent';
import { Domain } from 'domain';

let repository: CourseRepository;
let bus: EventBus;
let creator: CourseCreator;
declare global {
  namespace jest {
    interface Matchers<R> {
      toPublish(a: DomainEvent, b: DomainEvent): R;
    }
  }
}

expect.extend({
  toPublish(receivedEvent, expectedEvent) {
    const comparator = new DomainEventComparator()
    const pass = comparator.isSimilar(receivedEvent, expectedEvent);
    if (pass) {
      return {
        message: () =>
          `todo bien`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${receivedEvent} to be within range ${expectedEvent}`,
        pass: false,
      };
    }
  },
});

const createRepository = (): CourseRepository => ({ save: jest.fn(), search: jest.fn() });
const eventBus = (): EventBusMock => (new EventBusMock());
const shouldSave = (course: Course) => expect(repository.save).toHaveBeenCalledWith(course);
const shouldPublishDomainEvent = (event: CourseCreatedDomainEvent) => expect((bus.publish as jest.Mock);

beforeEach(() => {
  repository = createRepository();
  bus = eventBus();
  creator = new CourseCreator(repository, bus);
});

describe('Course Creator', () => {
  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random();

    const course = CourseMother.fromRequest(request);
    const event = CourseCreatedDomainEventMother.fromCourse(course);

    await creator.run(request);

    //shouldSave(course);
    shouldPublishDomainEvent(event);
  });
});
class EventBusMock implements EventBus {
  private spy = jest.fn();
  publish(events: DomainEvent[]): void {
    this.spy(events);
  }

  toHaveBeenCalledWith(event: DomainEvent) {
    this.spy.toPublish(event);
    const eventArg: DomainEvent[] = this.spy.mock.calls[0][0];
    return this.isSimilarTo(event, eventArg[0]);
  }

  private isSimilarTo(event1: DomainEvent, event2: DomainEvent) {
    const event1Data = this.getDomainAttributes(event1);
    const event2Data = this.getDomainAttributes(event2);

    return expect(event1Data).toMatchObject(event2Data);
  }

  private getDomainAttributes(event: DomainEvent) {
    const { eventId, occurredOn, ...data } = event;

    return data;
  }
}

class Mock {
  toHaveBeenCalledWith(event: DomainEvent) {
    const eventArg: DomainEvent[] = this.spy.mock.calls[0][0];
    return this.isSimilarTo(event, eventArg[0]);
  }

  private isSimilarTo(event1: DomainEvent, event2: DomainEvent) {
    const event1Data = this.getDomainAttributes(event1);
    const event2Data = this.getDomainAttributes(event2);

    return expect(event1Data).toMatchObject(event2Data);
  }

  private getDomainAttributes(event: DomainEvent) {
    const { eventId, occurredOn, ...data } = event;

    return data;
  }
}

interface Comparator<T> {
  isSimilar(t1: T, t2: T): void;
}

class DomainEventComparator implements Comparator<DomainEvent> {
  isSimilar(event1: DomainEvent, event2: DomainEvent) {
    const event1Data = this.getDomainAttributes(event1);
    const event2Data = this.getDomainAttributes(event2);

    return expect(event1Data).toMatchObject(event2Data);
  }

  private getDomainAttributes(event: DomainEvent) {
    const { eventId, occurredOn, ...data } = event;

    return data;
  }
}
class DefaultComparator implements Comparator<any> {
  isSimilar(event1: any, event2: any) {
    return expect(event1).toMatchObject(event1);
  }

}
class ComparatorFactory {
  static comparators = new Map<string, Comparator<any>>();

  static getComparatorFor(object: Object): Comparator<any> {
    const name: any = object.constructor.name;

    if (ComparatorFactory.comparators.has(name)) {
      return ComparatorFactory.comparators.get(name)!;
    }

    return new DefaultComparator();
  }
}

// function areSimilar(obj1: Object, obj2: Object, excludingFields: Array<string>) {
//   const obj1WithoutExcludingFields = {};
//   const obj2WithoutExcludingFields = {};

//   return expect(obj1WithoutExcludingFields).toMatchObject(obj2WithoutExcludingFields);
// }

// function pickProperties(obj: Object, excludingFields: Array<string>) {
//   return obj.keys.reduce(function(keyName, value) {
//     if (excludingFields.includes(keyName)) {
//     }
//   }, {});
// }
