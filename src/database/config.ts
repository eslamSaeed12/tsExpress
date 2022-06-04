import { env } from "../helpers/env";

const datbaseConfig = {
  srvUrl: env("DB_URL"),
  options: {},
};

export { datbaseConfig };
