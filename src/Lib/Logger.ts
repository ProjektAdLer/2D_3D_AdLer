import { config } from "../config";

interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

type LogLevel = "log" | "warn" | "error";

const defaultLogLevel = "warn";

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(console, "[ERROR] ");

    if (level === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console, "[WARNING] ");

    if (level === "warn") {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console, " [LOG] ");
  }
}

export const logger = new ConsoleLogger({
  level: (config.logLevel || defaultLogLevel) as LogLevel,
});
