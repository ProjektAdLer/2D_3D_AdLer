import { LogLevel } from "./Lib/Logger";
import { parseBool } from "./Lib/ParseBool";

export const config = {
  isDebug: parseBool(process.env.REACT_APP_IS_DEBUG || true),
  logLevel: process.env.REACT_APP_LOGLEVEL || "log",
  serverURL:
    process.env.REACT_APP_API_SERVER_URL || "https://api2.cluuub.xyz/api",
  useFakeBackend: parseBool(process.env.REACT_APP_USE_FAKEBACKEND || true),
} as {
  isDebug: boolean;
  logLevel: LogLevel;
  serverURL: string;
  useFakeBackend: boolean;
};
