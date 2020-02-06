export abstract class EnvironmentArranger {
  public async arrange(name: string): Promise<void> {
    await this.clean(name);
  }

  protected abstract clean(name: string): Promise<void>;

  public abstract close(): Promise<void>;
}
