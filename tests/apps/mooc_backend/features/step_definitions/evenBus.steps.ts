import { Given } from 'cucumber';
import container from '../../../../../src/apps/mooc_backend/config/dependency-injection';
import { EventBus } from '../../../../../src/Contexts/Shared/domain/EventBus';
import { CourseCreatedDomainEvent } from '../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent';

Given('I send an event to the event bus:', async (event: any) => {
  const eventBus = container.get('Mooc.shared.EventBus') as EventBus;
  const jsonEvent = JSON.parse(event).data;

  const domainEvent = CourseCreatedDomainEvent.fromPrimitives(
    jsonEvent.attributes.id,
    jsonEvent.attributes,
    jsonEvent.id,
    jsonEvent.occurred_on
  );

  await eventBus.publish([domainEvent]);
});

