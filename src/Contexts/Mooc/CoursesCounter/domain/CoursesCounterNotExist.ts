export class CoursesCounterNotExist extends Error {
  constructor() {
    super('The courses counter does not exists');
  }
}
