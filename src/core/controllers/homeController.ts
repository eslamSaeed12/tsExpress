import { Router } from "express";
import { controller } from "../../vendor/controller";
import { route } from "../../vendor/route";
import { loginBodyValidtor } from "../validators/login";

export class adminsController extends controller {
  home(req, res, next) {
    res.json(req.body);
  }

  pride(req, res, next) {
    res.json(req["originalUrl"]);
  }

  private assignRoutes() {
    this.route(this.home).setPath("/").setMethod("get").setValidaionRule({
      query: loginBodyValidtor,
    });

    this.route(this.pride).setMethod("get").setPath("/pride");
  }

  route(handler: (req, res, next) => void | Promise<void>) {
    this.routes.push(new route(handler));
    return this.routes[this.routes.length - 1];
  }

  private dispatchRoutes() {
    this.routes.forEach((r) => r.dispatchRoute(this.router));
  }

  bootstrap(): void {
    this.assignRoutes();
    this.dispatchRoutes();
  }

  constructor(private router: Router) {
    super(router);
  }
}
