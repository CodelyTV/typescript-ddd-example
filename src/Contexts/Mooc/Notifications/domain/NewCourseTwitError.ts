import { NewCourseTwit } from "./NewCourseTwit";

export class NewCourseTwitError extends Error {
  constructor(twit: NewCourseTwit) {
    super(`Error twiting new course message ${twit.message}`);
  }
}
