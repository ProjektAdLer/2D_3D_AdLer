import ViewModelControllerProvider from "../../../Core/Presentation/ViewModelProvider/ViewModelControllerProvider";
class TestViewModelA {}
class TestControllerA {}
class TestViewModelB {}

describe("ViewModelProvider", () => {
  let systemUnderTest: ViewModelControllerProvider;

  beforeEach(() => {
    systemUnderTest = new ViewModelControllerProvider();
  });

  test("registerTupelRequest registers a request", () => {
    const callback = jest.fn();
    systemUnderTest.registerTupelRequest<TestViewModelA, TestControllerA>(
      callback,
      TestViewModelA
    );

    expect(systemUnderTest["containers"].length).toBe(1);
    expect(systemUnderTest["containers"][0]["type"]).toBe(TestViewModelA);
    expect(systemUnderTest["containers"][0]["callbacks"].length).toBe(1);
    expect(systemUnderTest["containers"][0]["callbacks"][0]).toBe(callback);
  });

  test("cancelRequest cancels a previous registered request", () => {
    const callback = jest.fn();

    systemUnderTest.registerTupelRequest<TestViewModelA, TestControllerA>(
      callback,
      TestViewModelA
    );
    systemUnderTest.cancelRequest<TestViewModelA, TestControllerA>(
      callback,
      TestViewModelA
    );

    expect(systemUnderTest["containers"].length).toBe(1);
    expect(systemUnderTest["containers"][0]["type"]).toBe(TestViewModelA);
    expect(systemUnderTest["containers"][0]["callbacks"].length).toBe(0);
  });

  test("registerViewModelOnly calls callback when a view model was registered", () => {
    const callback = jest.fn();
    const viewModel = new TestViewModelA();

    systemUnderTest.registerTupelRequest<TestViewModelA, TestControllerA>(
      callback,
      TestViewModelA
    );
    systemUnderTest.registerViewModelOnly(viewModel, TestViewModelA);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith([[viewModel, undefined]]);
  });

  test("removeTupel calls callback when a view model was removed", () => {
    const myCallback = jest.fn();
    const viewModel = new TestViewModelA();

    systemUnderTest.registerViewModelOnly(viewModel, TestViewModelA);

    systemUnderTest.registerTupelRequest(myCallback, TestViewModelA);

    systemUnderTest.removeByViewModel(viewModel, TestViewModelA);

    // The callback gets called twice, because:
    // 1. The callback gets called onece, when registered
    // 2. The callback gets called onece, when the view model was removed
    expect(myCallback).toHaveBeenCalledTimes(2);
    expect(myCallback).lastCalledWith([]);
  });

  test("registerViewModelOnly registers view model", () => {
    const viewModelA = new TestViewModelA();
    const viewModelB = new TestViewModelB();

    systemUnderTest.registerViewModelOnly(viewModelA, TestViewModelA);
    systemUnderTest.registerViewModelOnly(viewModelB, TestViewModelB);

    expect(systemUnderTest["containers"].length).toBe(2);
    expect(systemUnderTest["containers"][0]["type"]).toBe(TestViewModelA);
    expect(systemUnderTest["containers"][1]["type"]).toBe(TestViewModelB);
    expect(systemUnderTest["containers"][0].getValues().length).toBe(1);
    expect(systemUnderTest["containers"][1].getValues().length).toBe(1);
    expect(systemUnderTest["containers"][0].getValues()[0]).toStrictEqual([
      viewModelA,
      undefined,
    ]);
    expect(systemUnderTest["containers"][1].getValues()[0]).toStrictEqual([
      viewModelB,
      undefined,
    ]);
  });

  test("removeTupel removes a previously added view model", () => {
    const viewModel = new TestViewModelA();
    const controller = new TestControllerA();

    systemUnderTest.registerTupel(viewModel, controller, TestViewModelA);

    systemUnderTest.removeByViewModel<TestViewModelA>(
      viewModel,
      TestViewModelA
    );

    expect(systemUnderTest["containers"][0].getValues().length).toBe(0);
  });

  test("removeTupel throws, if the value in a given container is now found", () => {
    const viewModel = new TestViewModelA();
    const wrongViewModel = new TestViewModelB();
    const controller = new TestControllerA();

    systemUnderTest.registerTupel(viewModel, controller, TestViewModelA);

    expect(() => {
      systemUnderTest.removeByViewModel<TestViewModelA>(
        wrongViewModel,
        TestViewModelA
      );
    }).toThrow();
  });
  test("removeTupel throws, if container is not found", () => {
    const viewModel = new TestViewModelA();
    const controller = new TestControllerA();

    systemUnderTest.registerTupel(viewModel, controller, TestViewModelA);

    expect(() => {
      systemUnderTest.removeByViewModel<TestViewModelB>(
        viewModel,
        TestViewModelB
      );
    }).toThrow();
  });
});
