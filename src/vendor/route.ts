import { NextFunction, Response, Request, Router } from "express";
import { Pipe } from "./pipe";
import { HttpFilter } from "./filter";
import { HttpGates } from "./gate";
import { HttpGuard } from "./guard";
import { Middleware } from "./middleware";
import { Unauthorized } from "http-errors";

export class route {
  private path: string;
  private method: string;
  private pipes: Pipe[];
  private middlewares: Middleware[];
  private guards: HttpGuard[];
  private filters: HttpFilter[];
  private handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void> | void;

  private gates: HttpGates[];

  constructor(
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void> | void
  ) {
    this.pipes = [];
    this.middlewares = [];
    this.guards = [];
    this.filters = [];
    this.handler = handler;
    this.gates = [];
  }

  setPath(path: string) {
    this.path = path;
    return this;
  }

  setMethod(method: "get" | "post" | "put" | "delete") {
    this.method = method;
    return this;
  }

  setPipe(pipe: Pipe) {
    this.pipes.push(pipe);
    return this;
  }

  setMiddleware(middleware: Middleware) {
    this.middlewares.push(middleware);
    return this;
  }

  setGuard(guard: HttpGuard) {
    this.guards.push(guard);
    return this;
  }

  setFilter(filter: HttpFilter) {
    this.filters.push(filter);
    return this;
  }

  setHandler(
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void> | void
  ) {
    this.handler = handler;
    return this;
  }

  setGate(gate: HttpGates) {
    this.gates.push(gate);
    return this;
  }

  async dispatchRoute(router: Router) {
    router[this.method](
      this.path,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          // middleware
          for (const mid of this.middlewares) {
            await mid.use.bind(mid, req, res, next)();
          }

          // pipes

          for (const p of this.pipes) {
            await p.transform.bind(p, req)();
          }

          // guards
          let canPass = true;

          for (const httpGuard of this.guards) {
            canPass = await httpGuard.guard.bind(httpGuard, req, res, next)();
          }

          if (!canPass) {
            throw new Unauthorized();
          }

          // dispatch handler
          await this.handler.bind(this, req, res, next)();
        } catch (err) {
          if (!this.filters.length) {
            return next(err);
          }

          for (const filter of this.filters) {
            await filter.catch.bind(filter, err, req, res, next)();
          }
        }
      }
    );
  }

  static build(
    handler: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void> | void
  ) {
    return new route(handler);
  }
}
