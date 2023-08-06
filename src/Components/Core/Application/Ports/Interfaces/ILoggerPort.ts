export default interface ILoggerPort {
  log(loglevel: string, message: string): void;
  exportLog(): void;
}
