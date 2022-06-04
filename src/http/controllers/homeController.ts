import { Controller } from "../../vendor/@Controller";

export class homeController extends Controller {
  home(req, res, next) {
    res.json("hello from home page");
  }

  assignRoutes() {
    this.route(this.home).setPath("").setMethod("get");
  }
}
