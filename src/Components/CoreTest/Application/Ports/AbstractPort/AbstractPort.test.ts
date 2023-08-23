import { mock } from "jest-mock-extended";
import AbstractPort from "../../../../Core/Application/Ports/AbstractPort/AbstractPort";

interface ITestAdapter {}
class TestPort extends AbstractPort<ITestAdapter> {}

const testAdapter: ITestAdapter = mock<ITestAdapter>();

describe("AbstractPort", () => {
  let systemUnderTest: TestPort;

  beforeEach(() => {
    systemUnderTest = new TestPort();
  });

  test("registerAdapter adds an adapter", () => {
    systemUnderTest.registerAdapter(testAdapter);

    expect(systemUnderTest["adapters"].length).toBe(1);
    expect(systemUnderTest["adapters"]).toContain(testAdapter);
  });

  test.skip("registerAdapter logs a warning if an adapter is already registered and doesn't adds it again", () => {
    systemUnderTest.registerAdapter(testAdapter);
    systemUnderTest.registerAdapter(testAdapter);

    expect(logger.warn).toBeCalledTimes(1);
    expect(systemUnderTest["adapters"].length).toBe(1);
  });

  test("unregisterAdapter removes an adapter", () => {
    systemUnderTest.registerAdapter(testAdapter);
    systemUnderTest.unregisterAdapter(testAdapter);

    expect(systemUnderTest["adapters"].length).toBe(0);
    expect(systemUnderTest["adapters"]).not.toContain(testAdapter);
  });
});
