import { ConsoleLogger } from "./../Logger";
describe("Logger", () => {
  jest.spyOn(console, "log");
  jest.spyOn(console, "warn");
  jest.spyOn(console, "error");
  it("should log any message at the log level", () => {
    const logger = new ConsoleLogger({ level: "log" });

    logger.log("Hello");
    expect(console.log).toHaveBeenCalledWith(" [LOG] ", "Hello");

    logger.warn("Hello");
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringMatching("[WARNING]"),
      "Hello"
    );

    logger.error("Hello");
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching("[ERROR]"),
      "Hello"
    );
  });

  it("should not call console.log at warn level", () => {
    const logger = new ConsoleLogger({ level: "warn" });

    logger.log("Hello");
    expect(console.log).not.toHaveBeenCalled();

    logger.warn("Hello");
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringMatching("[WARNING]"),
      "Hello"
    );

    logger.error("Hello");
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching("[ERROR]"),
      "Hello"
    );
  });

  it("should not call console.log at error level", () => {
    const logger = new ConsoleLogger({ level: "error" });

    logger.log("Hello");
    expect(console.log).not.toHaveBeenCalled();

    logger.warn("Hello");
    expect(console.warn).not.toHaveBeenCalled();

    logger.error("Hello");
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching("[ERROR]"),
      "Hello"
    );
  });
});
