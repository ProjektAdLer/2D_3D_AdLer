import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export default interface ILoggerPort {
  log(loglevel: LogLevelTypes, message: string): void;
  exportLog(): void;
}
