import { LogLevel } from "./Lib/Logger";
import { parseBool } from "./Lib/ParseBool";

export const config = {
  isDebug: parseBool(process.env.REACT_APP_IS_DEBUG || true),
  useAutoLogin: parseBool(process.env.REACT_APP_USE_AUTOLOGIN || true),
  userName: process.env.REACT_APP_DEBUG_USERNAME || "",
  password: process.env.REACT_APP_DEBUG_PASSWORD || "",
  logLevel: process.env.REACT_APP_LOGLEVEL || "log",
  serverURL:
    process.env.REACT_APP_API_SERVER_URL || "https://api.cluuub.xyz/api",
  useFakeBackend: parseBool(process.env.REACT_APP_USE_FAKEBACKEND || true),
  autoLoginWithoutShortcut: parseBool(
    process.env.REACT_APP_AUTO_LOGIN_WITHOUT_SHORTCUT || true
  ),
  nodeEnv: process.env.NODE_ENV || "development",
} as {
  isDebug: boolean;
  useAutoLogin: boolean;
  userName: string;
  password: string;
  logLevel: LogLevel;
  serverURL: string;
  useFakeBackend: boolean;
  autoLoginWithoutShortcut: boolean;
  nodeEnv: string;
};
