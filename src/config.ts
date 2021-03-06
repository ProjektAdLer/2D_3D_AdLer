import { parseBool } from "./Lib/ParseBool";

export const config = {
  isDebug: parseBool(process.env.REACT_APP_IS_DEBUG || false),
  useAutoLogin: parseBool(process.env.REACT_APP_USE_AUTOLOGIN || false),
  userName: process.env.REACT_APP_DEBUG_USERNAME || "",
  password: process.env.REACT_APP_DEBUG_PASSWORD || "",
  logLevel: process.env.REACT_APP_LOGLEVEL || "warn",
  serverURL: process.env.REACT_APP_API_SERVER_URL || "https://api.cluuub.xyz",
  useFakeBackend: parseBool(process.env.REACT_APP_USE_FAKEBACKEND || false),
  autoLoginWithoutShortct: parseBool(
    process.env.REACT_APP_AUTO_LOGIN_WITHOUT_SHORTCUT || false
  ),
};
