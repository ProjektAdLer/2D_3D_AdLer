export enum LogLevelTypes {
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

export type LogLevelTypesStrings = keyof typeof LogLevelTypes;
