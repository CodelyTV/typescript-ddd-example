import { TwitIdMother } from "./TwitIdMother";
import { TwitMessageMother } from "./TwitMessageMother";
import { TwitMother } from "./TwitMother";


describe('Twit', () => {

  it('should return a new twit instance', () => {
    const id = TwitIdMother.random();
    const message = TwitMessageMother.random();
    const twit = TwitMother.create(id, message);

    expect(twit.id.value).toBe(id.value);
    expect(twit.message.value).toBe(message.value);
  });
});
