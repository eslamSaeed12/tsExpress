import { Router } from "express";
import { Unauthorized } from "http-errors";
import { controller } from "./controller";
import { HttpFilter } from "./filter";
import { HttpGuard } from "./guard";
import { Middleware } from "./middleware";
import { Pipe } from "./pipe";

export class wildRoute {
  private middlewares: Array<Middleware>;
  private pipes: Array<Pipe>;
  private filters: Array<HttpFilter>;
  private guards: Array<HttpGuard>;
  private router: Router;

  constructor() {
    this.middlewares = [];
    this.pipes = [];
    this.filters = [];
    this.guards = [];
  }

  setRouter(router: Router) {
    this.router = router;
    return this;
  }

  setMiddleware(middleware: Middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  setPipe(pipe: Pipe) {
    this.pipes.push(pipe);
    return this;
  }

  setFilter(filter: HttpFilter) {
    this.filters.push(filter);
    return this;
  }

  setGuard(guard: HttpGuard) {
    this.guards.push(guard);
    return this;
  }

  dispatch() {
    this.router.use(async (req, res, next) => {
      for (let m of this.middlewares) {
        await m.use.bind(m, req, res, next)();
      }

      for (let p of this.pipes) {
        await p.transform.bind(p, req)();
      }

      let canPass = true;

      for (let g of this.guards) {
        canPass = await g.guard.bind(g, req, res, next)();
      }

      if (!canPass) {
        next(new Unauthorized());
      }

      next();
    });
  }

  public getFilters() {
    return this.filters;
  }

  public getRouter() {
    return this.router;
  }
}

export class routerModule {
  private controllers: Array<controller>;
  private wildRoute?: wildRoute;
  private prefix: string;
  private router: Router;

  constructor() {
    this.controllers = [];
  }

  dispatch() {
    if (this.wildRoute) {
      this.wildRoute.dispatch();
    }

    this.controllers.forEach((controller) => {
      controller.bootstrap();
    });

    // filters

    if (this.wildRoute) {
      this.wildRoute
        .getFilters()
        .forEach((filter) =>
          this.wildRoute.getRouter().use(filter.catch.bind(filter))
        );
    }
  }

  public addController(controller: controller) {
    this.controllers.push(controller);
  }

  public setControllers(controllers: Array<controller>) {
    this.controllers = controllers;
  }

  public setWildRoute(wild: wildRoute) {
    this.wildRoute = wild;
  }

  public getRouter() {
    return this.router;
  }

  public setPerfix(prefix: string) {
    this.prefix = prefix;
  }

  public setRouter(router: Router) {
    this.router = router;
  }

  public getPerfix() {
    return this.prefix;
  }
}
