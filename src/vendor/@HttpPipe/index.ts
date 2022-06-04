export abstract class Pipe {
  public abstract transform(req): Promise<void> | void;
}
