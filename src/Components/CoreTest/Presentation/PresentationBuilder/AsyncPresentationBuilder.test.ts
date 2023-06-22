import AsyncPresentationBuilder from "../../../Core/Presentation/PresentationBuilder/AsyncPresentationBuilder";

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

class TestBuilder extends AsyncPresentationBuilder<
  TestViewModel,
  TestController,
  TestView,
  TestPresenter
> {
  constructor() {
    super(TestViewModel, TestController, TestView, TestPresenter);
  }
}

describe("AsyncPresentationBuilder", () => {
  let systemUnderTest: TestBuilder;

  beforeEach(() => {
    systemUnderTest = new TestBuilder();
  });

  test("isCompleted resolves when resolveIsCompleted is called", async () => {
    const promise = systemUnderTest.isCompleted;
    systemUnderTest["resolveIsCompleted"]();
    await expect(promise).resolves.toBeUndefined();
  });
});
