import { Response } from "express";
import { HttpFilter } from "../vendor/@HttpFilter";
import { ValidationError } from "class-validator";


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
