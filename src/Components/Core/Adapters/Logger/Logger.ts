import { injectable } from "inversify";
import ILoggerPort from "../../Application/Ports/Interfaces/ILoggerPort";
import { LogLevelTypesStrings } from "../../Domain/Types/LogLevelTypes";
import CircularLogBuffer from "./CircularLogBuffer";
import FileExporter from "./FileExporter";

//Needed for config.ts
export type LogLevel = "log" | "warn" | "error";

@injectable()
export default class Logger implements ILoggerPort {
  private fileExporter: FileExporter;
  private circularLogBuffer: CircularLogBuffer;
  constructor() {
    this.fileExporter = new FileExporter();
    this.circularLogBuffer = new CircularLogBuffer();
  }

  log(logLevel: LogLevelTypesStrings, message: string): void {
    let log = `[${logLevel}]: ${message}`;
    this.circularLogBuffer.writeLog(log);

    if (logLevel === "DEBUG" || logLevel === "INFO") {
      console.log(log);
    }
    if (logLevel === "WARN") {
      console.warn(log);
    }
    if (logLevel === "ERROR" || logLevel === "CRITICAL") {
      console.error(log);
    }
  }

  exportLog(): void {
    let logStringArray = this.circularLogBuffer.readLog();
    let logString = logStringArray.join("\n");
    this.fileExporter.exportLog(logString);
  }
}
