import CircularLogBuffer from "../../../../Components/Core/Adapters/Logger/CircularLogBuffer";

describe("CircularLogBuffer", () => {
  let systemUnderTest: CircularLogBuffer;

  beforeEach(() => {
    systemUnderTest = new CircularLogBuffer();
  });

  test("WriteLog writes message into buffer list", () => {
    const message = "test message";
    systemUnderTest.writeLog(message);
    expect(systemUnderTest.readLog()[0]).toMatch(message);
  });
  test("IsEmpty returns true if buffer is empty, false otherwise", () => {
    expect(systemUnderTest.isEmpty()).toBe(true);
    const message = "test message";
    systemUnderTest.writeLog(message);
    expect(systemUnderTest.isEmpty()).toBe(false);
  });
  test("writing 501 logs overwrites the first log (implicitly tests for buffersize of 500)", () => {
    const message = "test message";
    for (let i = 0; i < 501; i++) {
      systemUnderTest.writeLog(`${message} ${i}`);
    }
    expect(systemUnderTest.readLog()[0]).toMatch(`${message} 500`);
    expect(systemUnderTest.readLog()[1]).toMatch(`${message} 1`);
    expect(systemUnderTest.getLogsTotal()).toBe(501);
  });
});
