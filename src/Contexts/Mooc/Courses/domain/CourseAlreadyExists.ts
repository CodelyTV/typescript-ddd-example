export default class CourseAlreadyExists extends Error {
  constructor(courseId: string) {
    super(`Course ${courseId} already exists`);
  }
}
