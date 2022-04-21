import ViewModelProvider from "../../../Core/Presentation/ViewModelProvider/ViewModelProvider";

class TestViewModelA {}
class TestViewModelB {}

describe("ViewModelProvider", () => {
  let viewModelProvider: ViewModelProvider;

  beforeEach(() => {
    viewModelProvider = new ViewModelProvider();
  });

  test("registerRequest registers a request", () => {
    const callback = jest.fn();
    viewModelProvider.registerRequest(callback, TestViewModelA);

    expect(viewModelProvider["containers"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModelA);
    expect(viewModelProvider["containers"][0]["callbacks"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["callbacks"][0]).toBe(callback);
  });

  test("cancelRequest cancels a previous registered request", () => {
    const callback = jest.fn();

    viewModelProvider.registerRequest(callback, TestViewModelA);
    viewModelProvider.cancelRequest(callback, TestViewModelA);

    expect(viewModelProvider["containers"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModelA);
    expect(viewModelProvider["containers"][0]["callbacks"].length).toBe(0);
  });

  test("registerViewModel calls callback when a view model was registered", () => {
    const callback = jest.fn();
    const viewModel = new TestViewModelA();

    viewModelProvider.registerRequest(callback, TestViewModelA);
    viewModelProvider.registerViewModel(viewModel, TestViewModelA);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([viewModel]);
  });

  test("removeViewModel calls callback when a view model was removed", () => {
    const callback = jest.fn();
    const viewModel = new TestViewModelA();

    viewModelProvider.registerRequest(callback, TestViewModelA);
    viewModelProvider.registerViewModel(viewModel, TestViewModelA);
    viewModelProvider.removeViewModel(viewModel, TestViewModelA);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).lastCalledWith([]);
  });

  test("registerViewModel registers view model", () => {
    const viewModelA = new TestViewModelA();
    const viewModelB = new TestViewModelB();

    viewModelProvider.registerViewModel(viewModelA, TestViewModelA);
    viewModelProvider.registerViewModel<TestViewModelA>(
      viewModelB,
      TestViewModelB
    );

    expect(viewModelProvider["containers"].length).toBe(2);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModelA);
    expect(viewModelProvider["containers"][1]["type"]).toBe(TestViewModelB);
    expect(viewModelProvider["containers"][0].getValues().length).toBe(1);
    expect(viewModelProvider["containers"][1].getValues().length).toBe(1);
    expect(viewModelProvider["containers"][0].getValues()[0]).toBe(viewModelA);
    expect(viewModelProvider["containers"][1].getValues()[0]).toBe(viewModelB);
  });

  test("removeViewModel removes a previously added view model", () => {
    const viewModel = new TestViewModelA();

    viewModelProvider.registerViewModel(viewModel, TestViewModelA);
    viewModelProvider.removeViewModel(viewModel, TestViewModelA);

    expect(viewModelProvider["containers"][0].getValues().length).toBe(0);
  });
});
