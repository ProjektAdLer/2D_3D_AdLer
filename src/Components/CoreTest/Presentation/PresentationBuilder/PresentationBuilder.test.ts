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

// class TestBuilderWithUndefined extends PresentationBuilder<
//   TestViewModel,
//   undefined,
//   TestView,
//   TestPresenter
// > {
//   constructor() {
//     super(undefined, undefined, TestView, TestPresenter);
//   }
// }

describe("PresentationBuilder", () => {
  test("reset sets members to undefined", () => {
    const builder = new TestBuilder();
    builder.reset();
    expect(builder["viewModel"]).toBeUndefined();
    expect(builder["controller"]).toBeUndefined();
    expect(builder["view"]).toBeUndefined();
    expect(builder["presenter"]).toBeUndefined();
  });

  test("buildViewModel", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    expect(builder["viewModel"]).toBeInstanceOf(TestViewModel);
  });

  //   test("buildViewModel if viewModelConstructorRef is undefined", () => {
  //     const builder = new TestBuilderWithUndefined();
  //   });

  test("buildController", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    expect(builder["controller"]).toBeInstanceOf(TestController);
  });

  test("buildController throws error if viewModel isn't build yet", () => {
    const builder = new TestBuilder();
    expect(() => builder.buildController()).toThrowError();
  });

  test("buildView", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    expect(builder["view"]).toBeInstanceOf(TestView);
  });

  test("buildView throws error if viewModel is not build", () => {
    const builder = new TestBuilder();
    expect(() => builder.buildView()).toThrowError();
  });

  test("buildView throws error if controller is not build", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    expect(() => builder.buildView()).toThrowError();
  });

  test("buildPresenter", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    builder.buildPresenter();
    expect(builder["presenter"]).toBeInstanceOf(TestPresenter);
  });

  test("buildPresenter throws error if viewModel is not build", () => {
    const builder = new TestBuilder();
    expect(() => builder.buildPresenter()).toThrowError();
  });

  test("getPresenter", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    builder.buildPresenter();
    expect(builder.getPresenter()).toBeInstanceOf(TestPresenter);
  });

  test("getController", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    builder.buildPresenter();
    expect(builder.getController()).toBeInstanceOf(TestController);
  });

  test("getViewModel", () => {
    const builder = new TestBuilder();
    builder.buildViewModel();
    builder.buildController();
    builder.buildView();
    builder.buildPresenter();
    expect(builder.getViewModel()).toBeInstanceOf(TestViewModel);
  });
});
