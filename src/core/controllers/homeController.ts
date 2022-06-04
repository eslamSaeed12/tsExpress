import { controller } from "../../vendor/controller";
import { loginBodyValidtor } from "../validators/login";

export class adminsController extends controller {
  home(req, res, next) {
    res.json(req.body);
  }

  pride(req, res, next) {
    res.json(req["originalUrl"]);
  }

  assignRoutes() {
    this.route(this.home).setPath("/").setMethod("get").setValidaionRule({
      query: loginBodyValidtor,
    });

    this.route(this.pride).setMethod("get").setPath("/pride");
  }
}
