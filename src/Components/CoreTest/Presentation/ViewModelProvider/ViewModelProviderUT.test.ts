import CoreDIContainer from "../../../Core/DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../Core/DependencyInjection/CoreTypes";
import IViewModelProvider from "../../../Core/Presentation/ViewModelProvider/IViewModelProvider";
import ViewModelProvider from "../../../Core/Presentation/ViewModelProvider/ViewModelProvider";

class TestViewModel {}

describe("ViewModelProvider", () => {
  let viewModelProvider: ViewModelProvider;

  beforeEach(() => {
    viewModelProvider = new ViewModelProvider();
  });

  test("registerRequest should register a request", () => {
    const callback = jest.fn();
    viewModelProvider.registerRequest(callback, TestViewModel);
    expect(viewModelProvider["containers"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModel);
    expect(viewModelProvider["containers"][0]["callbacks"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["callbacks"][0]).toBe(callback);
  });

  test("cancelRequest should cancel a previous registered request", () => {
    const callback = jest.fn();
    viewModelProvider.registerRequest(callback, TestViewModel);
    viewModelProvider.cancelRequest(callback, TestViewModel);
    expect(viewModelProvider["containers"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModel);
    expect(viewModelProvider["containers"][0]["callbacks"].length).toBe(0);
  });

  test("should call callback when a view model was registered", () => {
    const callback = jest.fn();
    const viewModel = new TestViewModel();
    viewModelProvider.registerRequest(callback, TestViewModel);
    viewModelProvider.registerViewModel(viewModel, TestViewModel);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([viewModel]);
  });

  test("registerViewModel should register view model", () => {
    const viewModel = new TestViewModel();
    viewModelProvider.registerViewModel(viewModel, TestViewModel);
    expect(viewModelProvider["containers"].length).toBe(1);
    expect(viewModelProvider["containers"][0]["type"]).toBe(TestViewModel);
    expect(viewModelProvider["containers"][0].getValues().length).toBe(1);
    expect(viewModelProvider["containers"][0].getValues()[0]).toBe(viewModel);
  });

  test("removeViewModel should remove a previously added view model", () => {
    const viewModel = new TestViewModel();
    viewModelProvider.registerViewModel(viewModel, TestViewModel);
    viewModelProvider.removeViewModel(viewModel, TestViewModel);
    expect(viewModelProvider["containers"][0].getValues().length).toBe(0);
  });
});
