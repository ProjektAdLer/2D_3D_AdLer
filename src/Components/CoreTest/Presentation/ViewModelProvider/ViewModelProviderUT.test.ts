import ViewModelControllerProvider from "../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";
class TestViewModelA {}
class TestControllerA {}
class TestViewModelB {}
class TestControllerB {}

describe("ViewModelProvider", () => {
  let viewModelControllerProvider: ViewModelControllerProvider;

  beforeEach(() => {
    viewModelControllerProvider = new ViewModelControllerProvider();
  });

  test("registerTupelRequest registers a request", () => {
    const callback = jest.fn();
    viewModelControllerProvider.registerTupelRequest<
      TestViewModelA,
      TestControllerA
    >(callback, TestViewModelA);

    expect(viewModelControllerProvider["containers"].length).toBe(1);
    expect(viewModelControllerProvider["containers"][0]["type"]).toBe(
      TestViewModelA
    );
    expect(
      viewModelControllerProvider["containers"][0]["callbacks"].length
    ).toBe(1);
    expect(viewModelControllerProvider["containers"][0]["callbacks"][0]).toBe(
      callback
    );
  });

  test("cancelRequest cancels a previous registered request", () => {
    const callback = jest.fn();

    viewModelControllerProvider.registerTupelRequest<
      TestViewModelA,
      TestControllerA
    >(callback, TestViewModelA);
    viewModelControllerProvider.cancelRequest<TestViewModelA, TestControllerA>(
      callback,
      TestViewModelA
    );

    expect(viewModelControllerProvider["containers"].length).toBe(1);
    expect(viewModelControllerProvider["containers"][0]["type"]).toBe(
      TestViewModelA
    );
    expect(
      viewModelControllerProvider["containers"][0]["callbacks"].length
    ).toBe(0);
  });

  test("registerViewModelOnly calls callback when a view model was registered", () => {
    const callback = jest.fn();
    const viewModel = new TestViewModelA();

    viewModelControllerProvider.registerTupelRequest<
      TestViewModelA,
      TestControllerA
    >(callback, TestViewModelA);
    viewModelControllerProvider.registerViewModelOnly(
      viewModel,
      TestViewModelA
    );

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([[viewModel, undefined]]);
  });

  test("removeTupel calls callback when a view model was removed", () => {
    const myCallback = jest.fn();
    const viewModel = new TestViewModelA();

    viewModelControllerProvider.registerViewModelOnly(
      viewModel,
      TestViewModelA
    );

    viewModelControllerProvider.registerTupelRequest(
      myCallback,
      TestViewModelA
    );

    viewModelControllerProvider.removeByViewModel(viewModel, TestViewModelA);

    // The callback gets called twice, because:
    // 1. The callback gets called onece, when registered
    // 2. The callback gets called onece, when the view model was removed
    expect(myCallback).toHaveBeenCalledTimes(2);
    expect(myCallback).lastCalledWith([]);
  });

  test("registerViewModelOnly registers view model", () => {
    const viewModelA = new TestViewModelA();
    const viewModelB = new TestViewModelB();

    viewModelControllerProvider.registerViewModelOnly(
      viewModelA,
      TestViewModelA
    );
    viewModelControllerProvider.registerViewModelOnly(
      viewModelB,
      TestViewModelB
    );

    expect(viewModelControllerProvider["containers"].length).toBe(2);
    expect(viewModelControllerProvider["containers"][0]["type"]).toBe(
      TestViewModelA
    );
    expect(viewModelControllerProvider["containers"][1]["type"]).toBe(
      TestViewModelB
    );
    expect(
      viewModelControllerProvider["containers"][0].getValues().length
    ).toBe(1);
    expect(
      viewModelControllerProvider["containers"][1].getValues().length
    ).toBe(1);
    expect(
      viewModelControllerProvider["containers"][0].getValues()[0]
    ).toStrictEqual([viewModelA, undefined]);
    expect(
      viewModelControllerProvider["containers"][1].getValues()[0]
    ).toStrictEqual([viewModelB, undefined]);
  });

  test("removeTupel removes a previously added view model", () => {
    const viewModel = new TestViewModelA();
    const controller = new TestControllerA();

    viewModelControllerProvider.registerTupel(
      viewModel,
      controller,
      TestViewModelA
    );

    viewModelControllerProvider.removeByViewModel<TestViewModelA>(
      viewModel,
      TestViewModelA
    );

    expect(
      viewModelControllerProvider["containers"][0].getValues().length
    ).toBe(0);
  });
});
