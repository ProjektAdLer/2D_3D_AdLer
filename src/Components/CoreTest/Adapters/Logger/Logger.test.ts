import Logger from "../../../../Components/Core/Adapters/Logger/Logger";
import CircularLogBuffer from "../../../Core/Adapters/Logger/CircularLogBuffer";
import FileExporter from "../../../Core/Adapters/Logger/FileExporter";

jest.spyOn(console, "log");
jest.spyOn(console, "warn");
jest.spyOn(console, "error");
jest.mock("../../../Core/Adapters/Logger/FileExporter");

describe("Logger", () => {
  let systemUnderTest: Logger;

  beforeEach(() => {
    systemUnderTest = new Logger();
  });
  test("Logger instantiates fileExporter and circularLogBuffer", () => {
    //@ts-ignore
    expect(systemUnderTest.fileExporter).toBeDefined();
    //@ts-ignore
    expect(systemUnderTest.circularLogBuffer).toBeDefined();
  });

  test("Logger calls circularLogBuffer", () => {
    const message = "test message";
    const logLevel = "TRACE";
    const circularLogBufferMock = jest.spyOn(
      CircularLogBuffer.prototype,
      "writeLog"
    );
    systemUnderTest.log(logLevel, message);
    expect(circularLogBufferMock).toHaveBeenCalledWith(
      `[${logLevel}]: ${message}`
    );
  });
  test("Logger writes into console if loglevel is debug or info", () => {
    const message = "test message";
    const logLevel = "INFO";
    systemUnderTest.log(logLevel, message);
    expect(console.log).toHaveBeenCalledWith(`[${logLevel}]: ${message}`);
    const logLevel2 = "DEBUG";
    systemUnderTest.log(logLevel2, message);
    expect(console.log).toHaveBeenCalledWith(`[${logLevel2}]: ${message}`);
  });
  test("Logger writes into console if loglevel is warn", () => {
    const message = "test message";
    const logLevel = "WARN";
    systemUnderTest.log(logLevel, message);
    expect(console.warn).toHaveBeenCalledWith(`[${logLevel}]: ${message}`);
  });
  test("Logger writes into console if loglevel is error or critical", () => {
    const message = "test message";
    const logLevel = "ERROR";
    systemUnderTest.log(logLevel, message);
    expect(console.error).toHaveBeenCalledWith(`[${logLevel}]: ${message}`);
    const logLevel2 = "CRITICAL";
    systemUnderTest.log(logLevel2, message);
    expect(console.error).toHaveBeenCalledWith(`[${logLevel2}]: ${message}`);
  });

  //ANF-ID: [ELG0013]
  test("Logger calls fileExporter", () => {
    const circularLogBufferMock = jest.spyOn(
      CircularLogBuffer.prototype,
      "readLog"
    );
    circularLogBufferMock.mockReturnValue(["test1", "test2"]);
    const fileExporterMock = jest.spyOn(FileExporter.prototype, "exportLog");
    systemUnderTest.exportLog();
    expect(fileExporterMock).toHaveBeenCalledWith("test1\ntest2");
  });
});
