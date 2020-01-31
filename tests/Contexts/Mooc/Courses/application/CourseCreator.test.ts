import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEvent } from '../../../../../src/Contexts/Shared/domain/DomainEvent';
import { CourseId } from '../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId';

let repository: CourseRepositoryDouble;
let bus: EventBusDouble;
let creator: CourseCreator;

describe('Course Creator', () => {
  beforeEach(() => {
    repository = new CourseRepositoryDouble();
    bus = new EventBusDouble();
    creator = new CourseCreator(repository, bus);
  });

  it('should create a valid course', async () => {
    const request = CreateCourseRequestMother.random();
    const expectedCourse = CourseMother.fromRequest(request);
    const expectedEvent = CourseCreatedDomainEventMother.fromCourse(expectedCourse);

    await creator.run(request);

    shouldSave(expectedCourse);
    shouldPublishDomainEvent(expectedEvent);
  });
});

const shouldSave = (course: Course) => {
  // I am not sure at all if we should remove the recorded events before comparing
  // I have done it to prevent the tests to fail if the courses have different events
  // or events with different ids
  expect(course).toMatchObject(repository.getLastSavedCourseWithoutRecordedEvents());
};

const shouldPublishDomainEvent = (event: CourseCreatedDomainEvent) => {
  expect(bus.hasPublishedLastEvent(event)).toBe(true);
};

class EventBusDouble implements EventBus {
  private spy = jest.fn();
  publish(events: DomainEvent[]): void {
    this.spy(events);
  }

  hasPublishedLastEvent(event: DomainEvent) {
    const eventArg: DomainEvent[] = this.spy.mock.calls[0][0];
    return this.isSimilarTo(event, eventArg[0]);
  }

  private isSimilarTo(event1: DomainEvent, event2: DomainEvent) {
    const event1Data = this.getDomainAttributes(event1);
    const event1DataKeys = Object.keys(event1Data);
    const event2Data = this.getDomainAttributes(event2);
    const event2DataKeys = Object.keys(event2Data);

    if (event1DataKeys.length !== event2DataKeys.length) {
      return false;
    }
    // We are considering that all the info in the event are key: stringValue but
    // the value may be an object and then the following comparation is not correct
    return event1DataKeys.every(key => event1Data[key] === event2Data[key]);
  }

  // I am not satisfied with the following "any"
  private getDomainAttributes(event: DomainEvent): any {
    const { eventId, occurredOn, ...data } = event;

    return data;
  }
}

class CourseRepositoryDouble implements CourseRepository {
  private spySave: jest.Mock = jest.fn();

  async save(course: Course) {
    this.spySave(course);
  }

  getLastSavedCourseWithoutRecordedEvents() {
    const lastSavedCourse = repository.spySave.mock.calls[0][0];
    return new Course(lastSavedCourse.id, lastSavedCourse.name, lastSavedCourse.duration);
  }

  async search(id: CourseId) {
    return null;
  }
}
