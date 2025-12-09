import history from "~ReactEntryPoint/history";
import { mock } from "jest-mock-extended";
import AbstractPort from "../../../../Core/Application/Ports/AbstractPort/AbstractPort";
import Logger from "../../../../Core/Adapters/Logger/Logger";
import CoreDIContainer from "../../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../Core/DependencyInjection/CoreTypes";
import { LocationScope } from "../../../../Core/Presentation/React/ReactRelated/ReactEntryPoint/HistoryWrapper";

const loggerMock = mock<Logger>();

interface ITestAdapter {}
class TestPort extends AbstractPort<ITestAdapter> {
  constructor() {
    super(loggerMock);
  }
}

const testAdapter: ITestAdapter = mock<ITestAdapter>();

describe("AbstractPort", () => {
  let systemUnderTest: TestPort;

  beforeAll(() => {
    CoreDIContainer.snapshot();

    CoreDIContainer.rebind(CORE_TYPES.ILogger).toConstantValue(loggerMock);
  });

  beforeEach(() => {
    systemUnderTest = CoreDIContainer.resolve(TestPort);
  });

  afterAll(() => {
    CoreDIContainer.restore();
  });

  test("constructor adds listener to browserhistory", () => {
    jest.spyOn(history, "listen");

    systemUnderTest = new TestPort();
    expect(history.listen).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  test("change in history calls evaluateScope", () => {
    systemUnderTest = new TestPort();
    const spy = jest.spyOn(systemUnderTest, "evaluateScope" as any);
    history.push("/");
    expect(spy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });

  test("registerAdapter adds an adapter", () => {
    systemUnderTest.registerAdapter(testAdapter, LocationScope._global);

    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope._global)!.length,
    ).toBe(1);
    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope._global)!,
    ).toContain(testAdapter);
  });

  test("registerAdapter logs a warning if an adapter is already registered and doesn't adds it again", () => {
    systemUnderTest.registerAdapter(testAdapter, LocationScope._global);
    systemUnderTest.registerAdapter(testAdapter, LocationScope._global);

    expect(loggerMock.log).toBeCalledTimes(1);
    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope._global)!.length,
    ).toBe(1);
  });

  test("unregisterAdapter removes an adapter", () => {
    systemUnderTest.registerAdapter(testAdapter, LocationScope._global);
    systemUnderTest.unregisterAdapter(testAdapter);

    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope._global)!.length,
    ).toBe(0);
    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope._global)!,
    ).not.toContain(testAdapter);
  });

  test("evaluateScope removes adapters that are not in given scope", () => {
    systemUnderTest.registerAdapter(testAdapter, LocationScope.spaceMenu);
    history.push(LocationScope.spaceDisplay);
    expect(
      systemUnderTest["mappedAdapters"].get(LocationScope.spaceMenu)?.length,
    ).toEqual(0);
  });

  test("name should return correct string", () => {
    expect(systemUnderTest.name()).toBe("Abstract-Port");
  });
});
