export abstract class EnvironmentArranger {
  public abstract arrange(): Promise<void>;

  public abstract close(): Promise<void>;

  public abstract addCourseWithId(id: string): Promise<void>;
}
