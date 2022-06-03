import { ClassConstructor } from "class-transformer";

export interface validationSchema {
  body?: ClassConstructor<any>;
  query?: ClassConstructor<any>;
  params?: ClassConstructor<any>;
  headers?: ClassConstructor<any>;
  cookies?: ClassConstructor<any>;
  session?: ClassConstructor<any>;
}
