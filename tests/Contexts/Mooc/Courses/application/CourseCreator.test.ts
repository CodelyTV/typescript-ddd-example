import { CourseMother } from '../domain/CourseMother';
import { CreateCourseRequestMother } from './CreateCourseRequestMother';
import { CourseCreatedDomainEventMother } from '../domain/CourseCreatedDomainEventMother';
import { CourseRepository } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseCreator } from '../../../../../src/Contexts/Mooc/Courses/application/CourseCreator';
import { Course } from '../../../../../src/Contexts/Mooc/Courses/domain/Course';
import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';

let repository: CourseRepository;
let bus: EventBus;
let creator: CourseCreator;
const createRepository = (): CourseRepository => ({ save: jest.fn(), search: jest.fn() });
const eventBus = (): EventBus => ({ publish: jest.fn() });
const shouldSave = (course: Course) => expect(repository.save).toHaveBeenCalledWith(course);
const shouldPublishDomainEvent = (event: CourseCreatedDomainEvent) => expect(bus.publish).toPublish(event);

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
