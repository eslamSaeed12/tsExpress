import { env } from "../helpers/env";

const datbaseConfig = {
  srvUrl: env("DB_URL", "mongodb://localhost:27017/feedbacker"),
  options: {},
};

export { datbaseConfig };
