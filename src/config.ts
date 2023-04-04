import { LogLevel } from "./Lib/Logger";
import { parseBool } from "./Lib/ParseBool";

const getServerURL = () => {
  if (process.env.NODE_ENV === "production") {
    console.log("We are in Production");

    if (window?._env_?.API_URL && typeof window?._env_?.API_URL === "string") {
      return window._env_.API_URL;
    }
  }
  if (!process.env.REACT_APP_API_SERVER_URL) {
    console.error("No API Server URL set!");
    throw new Error("No API Server URL set!");
  }
  return process.env.REACT_APP_API_SERVER_URL;
};

export const config = {
  isDebug: parseBool(process.env.REACT_APP_IS_DEBUG || true),
  logLevel: process.env.REACT_APP_LOGLEVEL || "log",
  serverURL: getServerURL(),
  useFakeBackend: parseBool(process.env.REACT_APP_USE_FAKEBACKEND || true),
} as {
  isDebug: boolean;
  logLevel: LogLevel;
  serverURL: string;
  useFakeBackend: boolean;
};

// Get the Server URL from config file in Public folder if we are in Production.
