import { Request, Response, NextFunction } from "express";

export abstract class Middleware {
  private static token = "middleware";
  abstract use(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> | void;
}
