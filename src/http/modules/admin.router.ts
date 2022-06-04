import { Router } from "express";
import { routerModule } from "../../vendor/@RouterModule";
import { homeController } from "../controllers/homeController";

const homeModule = new routerModule();
const homeController_ = new homeController();

// module -- initalization
homeModule.setRouter(Router());

homeModule.setPerfix("/");

// controllers  setting their router from the module
homeController_.setRouter(homeModule.getRouter());

homeModule.addController(homeController_);

homeModule.dispatch();

export { homeModule };
