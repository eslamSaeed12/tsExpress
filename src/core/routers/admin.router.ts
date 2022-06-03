import { Router } from "express";
import { adminsGuard } from "../../auth/guards/admins.guard";
import { router, wildRoute } from "../../vendor/router";
import { adminsController } from "../controllers/homeController";
import { resourceSetterPipe } from "../pipe/resource.pipe";

const route = new router(Router(), "/admin");

const controllers = [new adminsController(route.getRouter())];

const adminWildcard = new wildRoute(route.getRouter());

adminWildcard.setPipe(new resourceSetterPipe());

adminWildcard.setGuard(new adminsGuard());

adminWildcard.dispatch();

route.dispatch(controllers, adminWildcard);

export const adminRouter = route;
