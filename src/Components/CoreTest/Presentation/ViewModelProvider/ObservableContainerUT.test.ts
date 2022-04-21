import ObservableContainer from "../../../Core/Presentation/ViewModelProvider/ObservableContainer";

class TestClassA {
  public testString: string;
}
class TestClassB {
  public testNumber: number;
}

describe("ObservableContainer", () => {
  let container: ObservableContainer<TestClassA>;

  beforeEach(() => {
    container = new ObservableContainer<TestClassA>(TestClassA);
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

  test("cancelRequest cancels a previously registered callback", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    container.cancelRequest(callback);
    expect(container["callbacks"].length).toBe(0);
  });

  test("addNewValue adds a new value to the container", () => {
    const viewModel = new TestClassA();
    container.addNewValue(viewModel);
    expect(container["values"].length).toBe(1);
    expect(container["values"][0]).toBe(viewModel);
  });

  test("addNewValue calls registered callbacks", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    const viewModel = new TestClassA();
    container.addNewValue(viewModel);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([viewModel]);
  });

  test("removeValue removes a previously added value", () => {
    const viewModel = new TestClassA();
    container.addNewValue(viewModel);
    container.removeValue(viewModel);
    expect(container["values"].length).toBe(0);
  });

  test("removeValue calls registered callbacks", () => {
    const callback = jest.fn();
    container.registerRequest(callback);
    const viewModel = new TestClassA();
    container.addNewValue(viewModel);
    container.removeValue(viewModel);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).lastCalledWith([]);
  });

  test("getValues returns all previously added values", () => {
    const valueA = new TestClassA();
    container.addNewValue(valueA);
    console.log(container.getValues());
    expect(container.getValues()).toEqual([valueA]);
  });
});
