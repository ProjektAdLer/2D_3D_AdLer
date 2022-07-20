import PresentationBuilder from "../../../Core/Presentation/PresentationBuilder/PresentationBuilder";

class TestViewModel {}
class TestController {
  constructor(viewModel: TestViewModel) {}
}
class TestView {
  constructor(viewModel: TestViewModel, controller: TestController) {}
}
class TestPresenter {
  constructor(view: TestView) {}
}

class TestBuilder extends PresentationBuilder<
  TestViewModel,
  TestController,
  TestView,
  TestPresenter
> {
  constructor() {
    super(TestViewModel, TestController, TestView, TestPresenter);
  }
}

describe("PresentationBuilder", () => {
  let systemUnderTest: TestBuilder;
  beforeEach(() => {
    systemUnderTest = new TestBuilder();
  });
  test("reset sets members to undefined", () => {
    systemUnderTest.reset();
    expect(systemUnderTest["viewModel"]).toBeUndefined();
    expect(systemUnderTest["controller"]).toBeUndefined();
    expect(systemUnderTest["view"]).toBeUndefined();
    expect(systemUnderTest["presenter"]).toBeUndefined();
  });

  test("buildViewModel", () => {
    systemUnderTest.buildViewModel();
    expect(systemUnderTest["viewModel"]).toBeInstanceOf(TestViewModel);
  });

  test("buildController", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    expect(systemUnderTest["controller"]).toBeInstanceOf(TestController);
  });

  test("buildController throws error if viewModel isn't build yet", () => {
    expect(() => systemUnderTest.buildController()).toThrowError();
  });

  test("buildView", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildView();
    expect(systemUnderTest["view"]).toBeInstanceOf(TestView);
  });

  test("buildView throws error if viewModel is not build", () => {
    expect(() => systemUnderTest.buildView()).toThrowError();
  });

  test("buildView throws error if controller is not build", () => {
    systemUnderTest.buildViewModel();
    expect(() => systemUnderTest.buildView()).toThrowError();
  });

  test("buildPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildView();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest["presenter"]).toBeInstanceOf(TestPresenter);
  });

  test("buildPresenter throws error if viewModel is not build", () => {
    expect(() => systemUnderTest.buildPresenter()).toThrowError();
  });

  test("getPresenter", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildView();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest.getPresenter()).toBeInstanceOf(TestPresenter);
  });

  test("getController", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildView();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest.getController()).toBeInstanceOf(TestController);
  });

  test("getViewModel", () => {
    systemUnderTest.buildViewModel();
    systemUnderTest.buildController();
    systemUnderTest.buildView();
    systemUnderTest.buildPresenter();
    expect(systemUnderTest.getViewModel()).toBeInstanceOf(TestViewModel);
  });
});
