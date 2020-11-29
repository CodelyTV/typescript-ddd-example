import { TwitSenderMock } from '../../__mocks__/TwitSenderMock';
import SendNewCourseTwit from '../../../../../../src/Contexts/Mooc/Notifications/application/SendNewCourseTwit/SendNewCourseTwit';
import SendNewCourseTwitOnCourseCreated from '../../../../../../src/Contexts/Mooc/Notifications/application/SendNewCourseTwit/SendNewCourseTwitOnCourseCreated';
import { UuidMother } from '../../../../Shared/domain/UuidMother';
import { CourseCreatedDomainEvent } from '../../../../../../src/Contexts/Mooc/Notifications/domain/CourseCreatedDomainEvent';
import { NewCourseTwit } from '../../../../../../src/Contexts/Mooc/Notifications/domain/NewCourseTwit';
import { WordMother } from '../../../../Shared/domain/WordMother';
import { TwitSender } from '../../../../../../src/Contexts/Mooc/Notifications/domain/TwitSender';
import { Twit } from '../../../../../../src/Contexts/Mooc/Notifications/domain/Twit';
import { NewCourseTwitError } from '../../../../../../src/Contexts/Mooc/Notifications/domain/NewCourseTwitError';

describe('SendNewCourseTwitOnCourseCreated event handler', () => {
  it('Send a new course twit', async () => {
    const twitSenderMock = new TwitSenderMock();
    const sendNewCourseTwit = new SendNewCourseTwit(twitSenderMock);
    const sendNewCourseTwitOnCourseCreated = new SendNewCourseTwitOnCourseCreated(sendNewCourseTwit);
    const courseName = aNewCourseName();
    const domainEvent = aNewCourseDomainEvent(courseName);

    await sendNewCourseTwitOnCourseCreated.on(domainEvent);

    const lastTwitSent = twitSenderMock.lastTwitSent();
    twitSenderMock.assertSentTimes(1);
    expect(lastTwitSent).toBeInstanceOf(NewCourseTwit);
    expect(lastTwitSent.message.value).toEqual(`New course published. ${courseName}`);
  });

  it('throws a NewCourseTwitError if the twitSender fails', async () => {
    const failingEmailSender = aFailingTwitSender();
    const sendNewCourseTwit = new SendNewCourseTwit(failingEmailSender);
    const sendNewCourseTwitOnCourseCreated = new SendNewCourseTwitOnCourseCreated(sendNewCourseTwit);

    const domainEvent = aNewCourseDomainEvent(aNewCourseName());
    let error;

    try {
      await sendNewCourseTwitOnCourseCreated.on(domainEvent);
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error).toBeInstanceOf(NewCourseTwitError);
    expect(error.message).toBe(`Error twiting new course message New course published. ${domainEvent.name}`);
  });
});

function aFailingTwitSender() {
  return {
    async send(twit: Twit) {
      throw new Error('some error');
    }
  } as TwitSender;
}

function aNewCourseName(): string {
  return WordMother.random();
}

function aNewCourseDomainEvent(courseName: string) {
  return new CourseCreatedDomainEvent({
    id: UuidMother.random(),
    duration: WordMother.random(),
    name: courseName
  });
}
