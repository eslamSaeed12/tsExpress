export abstract class Pipe {
  public static token = "pipe";
  public abstract transform(req): Promise<void> | void;
}
