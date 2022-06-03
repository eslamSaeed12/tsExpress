import { Response } from "express";
import { HttpFilter } from "../vendor/filter";
import { ValidationError } from "class-validator";
import { BadRequest } from "http-errors";
export class validationFilter extends HttpFilter {
  catch(
    err: unknown,
    req: any,
    res: Response,
    next: any
  ): void | Promise<void> {
    if (err?.[0] && err[0] instanceof ValidationError) {
      res.status(400).json(err);
    } else {
      next(err);
    }
  }
}
