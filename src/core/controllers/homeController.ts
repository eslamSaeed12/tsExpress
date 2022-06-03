import { Router } from "express";
import { controller } from "../../vendor/controller";
import { route } from "../../vendor/route";
import { loginBodyValidtor } from "../validators/login";

export class adminsController extends controller {
  home(req, res, next) {
    res.json(req.body);
  }

  private assignRoutes() {
    this.addRoute(
      new route(this.home).setPath("/").setMethod("get").setValidaionRule({
        query: loginBodyValidtor,
      })
    );
  }

  private dispatchRoutes() {
    this.routes.forEach((r) => r.dispatchRoute(this.router));
  }

  bootstrap(): void {
    this.assignRoutes();
    this.dispatchRoutes();
  }

  constructor(private router: Router) {
    super();
  }
}
