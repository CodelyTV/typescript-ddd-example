export class CoursesCounterNotExist extends Error {
  constructor() {
    super('The courses counter not exist');
  }
}
