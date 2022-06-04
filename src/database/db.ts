import mongoose from "mongoose";
import { logger } from "../helpers/Logger";
import { datbaseConfig } from "./config";

const dbConnection = async () => {
  try {
    await mongoose.connect(datbaseConfig.srvUrl, datbaseConfig.options);
    return mongoose.connection;
  } catch (error) {
    logger.error("Error while connecting to database", error.message);
  }
};

export { dbConnection };
