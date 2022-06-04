import { config } from "dotenv";

config();

export const env = function (key: string, defaultValue?: string): string {
  const value = process.env[key];

  if (value) {
    return value;
  }

  if (defaultValue) {
    return defaultValue;
  }

  throw new Error(`Environment variable ${key} not set`);
};
