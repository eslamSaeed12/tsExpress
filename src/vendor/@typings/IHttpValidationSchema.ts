import { ClassConstructor } from "class-transformer";

export interface IHttpValidationSchema {
  body?: ClassConstructor<any>;
  query?: ClassConstructor<any>;
  params?: ClassConstructor<any>;
  headers?: ClassConstructor<any>;
  cookies?: ClassConstructor<any>;
  session?: ClassConstructor<any>;
}
