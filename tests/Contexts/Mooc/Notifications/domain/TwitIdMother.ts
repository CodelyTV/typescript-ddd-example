import { UuidMother } from "../../../Shared/domain/UuidMother";
import { TwitId } from "../../../../../src/Contexts/Mooc/Notifications/domain/TwitId";

export class TwitIdMother {
  static create(value: string): TwitId {
    return new TwitId(value);
  }

  static creator() {
    return () => TwitIdMother.random();
  }

  static random(): TwitId {
    return this.create(UuidMother.random());
  }
}
