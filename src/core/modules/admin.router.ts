import { Router } from "express";
import { adminsGuard } from "../../auth/guards/admins.guard";
import { routerModule, wildRoute } from "../../vendor/@RouterModule";
import { adminsController } from "../controllers/homeController";
import { resourceSetterPipe } from "../pipe/resource.pipe";

const adminModule = new routerModule();
const adminController_ = new adminsController();
const adminWildcard = new wildRoute();


// module -- initalization
adminModule.setRouter(Router());

adminModule.setPerfix("/admin");

// controllers  setting their router from the module
adminController_.setRouter(adminModule.getRouter());

adminModule.addController(adminController_);


adminWildcard.setRouter(adminModule.getRouter());

adminModule.setWildRoute(adminWildcard);

adminWildcard.setPipe(new resourceSetterPipe());

adminWildcard.setGuard(new adminsGuard());

adminWildcard.dispatch();

adminModule.dispatch();

export { adminModule as adminRouter };
