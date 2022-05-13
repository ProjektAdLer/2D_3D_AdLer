import ObservableContainer from "../../../Core/Presentation/ViewModelProvider/ObservableContainer";

class TestClassA {
  public testString: string;
}
class TestClassB {
  public testNumber: number;
}

describe("ObservableContainer", () => {
  let container: ObservableContainer<TestClassA, TestClassB>;

  beforeEach(() => {
    container = new ObservableContainer<TestClassA, TestClassB>(TestClassA);
  });

  test("matchesType compares the container type with a given type and return a corresponding bool", () => {
    expect(container.matchesType(TestClassA)).toBe(true);
    expect(container.matchesType(TestClassB)).toBe(false);
  });

  test("registerRequest registers a callback", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    expect(container["callbacks"].length).toBe(1);
    expect(container["callbacks"][0]).toBe(callback);
  });

  test("registerRequest calls new callback immediately if values are available", () => {
    const callback = jest.fn();
    const testClassA = new TestClassA();
    const testClassB = new TestClassB();
    container.addNewValue(testClassB);
    container.registerRequest(callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([testClassA]);
  });

  test("cancelRequest cancels a previously registered callback", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    container.cancelRequest(callback);
    expect(container["callbacks"].length).toBe(0);
  });

  test("addNewValue adds a new value to the container", () => {
    const testClass = new TestClassB();
    container.addNewValue(testClass);
    expect(container["values"].length).toBe(1);
    expect(container["values"][0]).toBe(testClass);
  });

  test("addNewValue calls registered callbacks", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    const testClassB = new TestClassB();
    container.addNewValue(testClassB);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([testClassB]);
  });

  test("removeValue removes a previously added value", () => {
    const testClassB = new TestClassB();
    container.addNewValue(testClassB);
    container.removeValue(testClassB);
    expect(container["values"].length).toBe(0);
  });

  test("removeValue calls registered callbacks", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    const testClass = new TestClassB();
    container.addNewValue(testClass);
    container.removeValue(testClass);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).lastCalledWith([]);
  });

  test("getValues returns all previously added values", () => {
    const value = new TestClassB();
    container.addNewValue(value);
    console.log(container.getValues());
    expect(container.getValues()).toEqual([value]);
  });
});
