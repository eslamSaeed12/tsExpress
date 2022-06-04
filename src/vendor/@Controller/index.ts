import { Router } from "express";
import { route } from "../@Route";

export abstract class Controller {
  protected routes: route[];
  private router: Router;

  constructor() {
    this.routes = [];
  }

  public setRouter(router: Router) {
    this.router = router;
  }

  private dispatchRoutes() {
    this.routes.forEach((r) => r.dispatchRoute(this.router));
  }

  protected abstract assignRoutes(): void;

  public bootstrap(): void {
    this.assignRoutes();
    this.dispatchRoutes();
  }

  protected route(handler: (req, res, next) => void | Promise<void>) {
    this.routes.push(new route());
    this.routes[this.routes.length - 1].setHandler(handler);
    return this.routes[this.routes.length - 1];
  }

  public getRoutes() {
    return this.routes;
  }

  protected addRoute(route: route) {
    this.routes.push(route);
  }
}
