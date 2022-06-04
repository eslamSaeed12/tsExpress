import { Router } from "express";
import { adminsGuard } from "../../auth/guards/admins.guard";
import { router, wildRoute } from "../../vendor/router";
import { adminsController } from "../controllers/homeController";
import { resourceSetterPipe } from "../pipe/resource.pipe";

const adminModule = new router(Router(), "/admin");

const controllers = [new adminsController(adminModule.getRouter())];

const adminWildcard = new wildRoute(adminModule.getRouter());

adminWildcard.setPipe(new resourceSetterPipe());

adminWildcard.setGuard(new adminsGuard());

adminWildcard.dispatch();

adminModule.dispatch(controllers, adminWildcard);

export { adminModule as adminRouter };
