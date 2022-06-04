import { HttpGates } from "../../vendor/@Granter";
import { HttpGuard } from "../../vendor/@HttpGuard";

export class gatesGuard implements HttpGuard {
  guard(req: Request): boolean | Promise<boolean> {
    const user = req?.["user"];

    if (!user) {
      return false;
    }

    const abilities = user.abilities;

    if (!abilities) {
      return false;
    }

    const resource = req["resource"];

    if (!resource) {
      throw Error("Resource not found");
    }

    return HttpGates.can(abilities, resource, user);
  }
}
