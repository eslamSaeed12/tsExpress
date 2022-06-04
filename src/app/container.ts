import { httpContainer } from "../vendor/@HttpContainer";

export class AppContainer extends httpContainer {
  controllers = [];

  middlewares = [];

  modules = [];

  pipes = [];

  guards = [];

  filters = [];
}
