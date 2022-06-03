import "reflect-metadata";
import { ExpressServer } from "./vendor/server";
import express from "express";
import { adminRouter } from "./core/routers/admin.router";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import csurf from "csurf";
import hpp from "hpp";
import { env } from "./helpers/env";
import { logger } from "./helpers/Logger";
import xss from "xss-clean";

// ---------------------- variables area ----------------------
const app = express();
const server = new ExpressServer(app);

// ---------------------- ----------------------

// ---------------------- middlewares area ----------------------

server.setMiddleware({ use: helmet() });
server.setMiddleware({ use: bodyParser.json() });
server.setMiddleware({ use: bodyParser.urlencoded({ extended: false }) });
server.setMiddleware({ use: cors({ origin: "*" }) });
server.setMiddleware({ use: hpp() });
// server.setMiddleware({ use: csurf({ cookie: true }) });
server.setMiddleware({ use: express.static(process.cwd() + "/public") });
server.setMiddleware({ use: xss() });

// ------------------- routes area ---------------------
server.setRouter(adminRouter.getRouter(), adminRouter.getPerfix());
// -------------------------------------

// ---------------------- start server ----------------------
server.serve({
  port: Number(env("PORT", "3000")),
  host: env("HOST", "127.0.0.1"),
  beforeBootstrap() {
    logger.info("app wiil start ☻ ☻ ☻ ");
  },
  afterBootstrap() {
    logger.info(`app is running on port ${env("HOST")}:${env("PORT")}`);
  },
});
