import { httpFilter } from "../../filters/http.filter";
import { Controller } from "../@Controller";
import { HttpGuard } from "../@HttpGuard";
import { Middleware } from "../@HttpMiddleware";
import { Pipe } from "../@HttpPipe";
import { routerModule } from "../@RouterModule";

export abstract class httpContainer {
  protected abstract controllers: Array<typeof Controller>;

  protected abstract middlewares: Array<typeof Middleware>;

  protected abstract modules: Array<typeof routerModule>;

  protected abstract pipes: Array<typeof Pipe>;

  protected abstract guards: Array<typeof HttpGuard>;

  protected abstract filters: Array<typeof httpFilter>;

  getControllers() {
    return this.controllers;
  }

  getMiddlewares() {
    return this.middlewares;
  }

  getModules() {
    return this.modules;
  }

  getPipes() {
    return this.pipes;
  }

  getGuards() {
    return this.guards;
  }

  getFilters() {
    return this.filters;
  }
}
