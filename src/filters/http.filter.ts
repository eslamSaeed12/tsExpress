import { Response } from "express";
import { HttpFilter } from "../vendor/@HttpFilter";
import { isHttpError } from "http-errors";

export class httpFilter extends HttpFilter {
  catch(
    err: unknown,
    req: any,
    res: Response,
    next: any
  ): void | Promise<void> {
    if (isHttpError(err)) {
      res.status(err.status).json({ status: err.status, message: err.message });
    } else {
      next(err);
    }
  }
}
