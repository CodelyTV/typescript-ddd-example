import { EnvironmentArranger } from './EnvironmentArranger';

export class NullEnvironmentArranger extends EnvironmentArranger {
  protected async clean(name: string): Promise<void> {}

  public async close(): Promise<void> {}
}
