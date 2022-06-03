import { Pipe } from "../../vendor/pipe";

export class resourceSetterPipe extends Pipe {
  public transform(req: Request): void | Promise<void> {
    const url = req["originalUrl"]?.split("/");

    if (url?.length > 2) {
      req["resource"] = url[2];
    }
    
  }
}
