import RabbitMqEventbus from '../../../../../src/Contexts/Shared/infrastructure/EventBus/RabbitMq/RabbitMqEventBus';
import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';
import { DomainEventJsonDeserializer } from '../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventJsonDeserializer';

describe('RabbitMqEventBus', () => {
  it('publish and receives and event', async () => {
    const deserializer = ({
      deserialize: (message: string) => aCourseCreatedEvent()
    } as any) as DomainEventJsonDeserializer;
    const eventBus = new RabbitMqEventbus(deserializer);

    await eventBus.publish([aCourseCreatedEvent()]);
  });
});

function aCourseCreatedEvent() {
  return new CourseCreatedDomainEvent({
    id: 'aCourseId',
    duration: 'aCourseDuration',
    name: 'aCourseName'
  });
}
