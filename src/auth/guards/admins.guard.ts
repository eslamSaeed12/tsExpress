import { NextFunction } from "express";
import { HttpGuard } from "../../vendor/@HttpGuard";

export class adminsGuard implements HttpGuard {
  guard(
    req: Request,
    res: Response,
    next: NextFunction
  ): boolean | Promise<boolean> {
    return true;
  }
}
