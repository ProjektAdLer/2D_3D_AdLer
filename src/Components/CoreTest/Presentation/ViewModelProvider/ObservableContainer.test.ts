import ObservableContainer from "../../../Core/Presentation/ViewModelProvider/ObservableContainer";

class TestClassA {
  public testString: string;
}
class TestClassB {
  public testNumber: number;
}

describe("ObservableContainer", () => {
  let systemUnderTest: ObservableContainer<TestClassA, TestClassB>;

  beforeEach(() => {
    systemUnderTest = new ObservableContainer<TestClassA, TestClassB>(
      TestClassA
    );
  });

  test("matchesType compares the container type with a given type and return a corresponding bool", () => {
    expect(systemUnderTest.matchesType(TestClassA)).toBe(true);
    expect(systemUnderTest.matchesType(TestClassB)).toBe(false);
  });

  test("registerRequest registers a callback", () => {
    const callback = jest.fn();
    systemUnderTest.registerRequest(callback);
    expect(systemUnderTest["callbacks"].length).toBe(1);
    expect(systemUnderTest["callbacks"][0]).toBe(callback);
  });

  test("registerRequest calls new callback immediately if values are available", () => {
    const callback = jest.fn();
    const testClassA = new TestClassA();
    const testClassB = new TestClassB();
    systemUnderTest.addNewValue(testClassB);
    systemUnderTest.registerRequest(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([testClassA]);
  });

  test("cancelRequest cancels a previously registered callback", () => {
    const callback = jest.fn();
    systemUnderTest.registerRequest(callback);
    systemUnderTest.cancelRequest(callback);
    expect(systemUnderTest["callbacks"].length).toBe(0);
  });

  test("addNewValue adds a new value to the container", () => {
    const testClass = new TestClassB();
    systemUnderTest.addNewValue(testClass);
    expect(systemUnderTest["values"].length).toBe(1);
    expect(systemUnderTest["values"][0]).toBe(testClass);
  });

  test("addNewValue calls registered callbacks", () => {
    const callback = jest.fn();
    systemUnderTest.registerRequest(callback);
    const testClassB = new TestClassB();
    systemUnderTest.addNewValue(testClassB);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([testClassB]);
  });

  test("removeValue removes a previously added value", () => {
    const testClassB = new TestClassB();
    systemUnderTest.addNewValue(testClassB);
    systemUnderTest.removeValue(testClassB);
    expect(systemUnderTest["values"].length).toBe(0);
  });

  test("removeValue calls registered callbacks", () => {
    const callback = jest.fn();
    systemUnderTest.registerRequest(callback);
    const testClass = new TestClassB();
    systemUnderTest.addNewValue(testClass);
    systemUnderTest.removeValue(testClass);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).lastCalledWith([]);
  });

  test("getValues returns all previously added values", () => {
    const value = new TestClassB();
    systemUnderTest.addNewValue(value);
    expect(systemUnderTest.getValues()).toEqual([value]);
  });
});
