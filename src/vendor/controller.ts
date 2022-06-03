import { route } from "./route";

export abstract class controller {
  protected routes: route[];

  constructor() {
    this.routes = [];
  }

  abstract bootstrap(): void;

  public getRoutes() {
    return this.routes;
  }

  protected addRoute(route: route) {
    this.routes.push(route);
  }
 
}
