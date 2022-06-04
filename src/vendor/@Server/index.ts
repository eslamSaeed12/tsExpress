import { Express, Router } from "express";
import { httpFilter } from "../../filters/http.filter";
import { Middleware } from "../@HttpMiddleware";

interface IServerBootstraper {
  beforeBootstrap?: (app: Express) => Promise<void> | void;
  afterBootstrap?: (app: Express) => Promise<void> | void;
  port: number;
  host: string;
}

export class ExpressServer {
  constructor(private app: Express) {}

  public setRouter(router: Router, prefix: string) {
    this.app.use(prefix, router);
  }

  public setMiddleware(mid: Middleware) {
    this.app.use(mid.use.bind(mid));
  }

  public setFilter(filter: httpFilter) {
    this.app.use(filter.catch.bind(filter));
  }

  public async serve({
    beforeBootstrap,
    port,
    host,
    afterBootstrap,
  }: IServerBootstraper) {
    if (beforeBootstrap) {
      await beforeBootstrap(this.app);
    }

    this.app.listen(port, host);

    if (afterBootstrap) {
      await afterBootstrap(this.app);
    }
  }

  public getApp() {
    return this.app;
  }
}
