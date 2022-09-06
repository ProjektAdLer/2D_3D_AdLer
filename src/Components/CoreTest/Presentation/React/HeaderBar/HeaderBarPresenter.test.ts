import HeaderBarPresenter from "../../../../Core/Presentation/React/HeaderBar/HeaderBarPresenter";
import HeaderBarViewModel from "../../../../Core/Presentation/React/HeaderBar/HeaderBarViewModel";

describe("HeaderBarPresenter", () => {
  let systemUnderTest: HeaderBarPresenter;

  beforeEach(() => {
    systemUnderTest = new HeaderBarPresenter(new HeaderBarViewModel());
  });

  test("displayLearningWorldTitle sets viewModel variable", () => {
    systemUnderTest.displayLearningWorldTitle("test");
    expect(systemUnderTest["viewModel"].title.Value).toBe("test");
  });
});
