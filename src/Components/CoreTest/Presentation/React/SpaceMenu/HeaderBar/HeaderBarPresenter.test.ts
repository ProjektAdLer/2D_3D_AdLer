import HeaderBarPresenter from "../../../../../Core/Presentation/React/SpaceMenu/HeaderBar/HeaderBarPresenter";
import HeaderBarViewModel from "../../../../../Core/Presentation/React/SpaceMenu/HeaderBar/HeaderBarViewModel";

let systemUnderTest: HeaderBarPresenter;

describe("HeaderBarPresenter", () => {
  beforeEach(() => {
    const vm = new HeaderBarViewModel();

    vm.title.Value = "Lernwelt12354";
    systemUnderTest = new HeaderBarPresenter(vm);
  });

  test("displayWorldTitle sets viewModel variable", () => {
    systemUnderTest.onWorldLoaded({ worldName: "test" });
    expect(systemUnderTest["viewModel"].title.Value).toBe("test");
  });
});
