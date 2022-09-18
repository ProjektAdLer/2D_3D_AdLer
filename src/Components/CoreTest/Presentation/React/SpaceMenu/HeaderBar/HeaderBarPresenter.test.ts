import HeaderBarPresenter from "../../../../../Core/Presentation/React/SpaceMenu/HeaderBar/HeaderBarPresenter";
import HeaderBarViewModel from "../../../../../Core/Presentation/React/SpaceMenu/HeaderBar/HeaderBarViewModel";

describe("HeaderBarPresenter", () => {
  let systemUnderTest: HeaderBarPresenter;

  beforeEach(() => {
    systemUnderTest = new HeaderBarPresenter(new HeaderBarViewModel());
  });

  test("displayWorldTitle sets viewModel variable", () => {
    systemUnderTest.displayWorldTitle("test");
    expect(systemUnderTest["viewModel"].title.Value).toBe("test");
  });
});
