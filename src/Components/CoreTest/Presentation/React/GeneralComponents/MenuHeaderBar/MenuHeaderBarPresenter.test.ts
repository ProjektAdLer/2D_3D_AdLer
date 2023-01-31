import MenuHeaderBarPresenter from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarViewModel";

let systemUnderTest: MenuHeaderBarPresenter;

describe("MenuHeaderBarPresenter", () => {
  beforeEach(() => {
    const vm = new MenuHeaderBarViewModel();

    vm.title.Value = "Lernwelt12354";
    systemUnderTest = new MenuHeaderBarPresenter(vm);
  });

  test("displayWorldTitle sets viewModel variable", () => {
    systemUnderTest.onWorldLoaded({ worldName: "test" });
    expect(systemUnderTest["viewModel"].title.Value).toBe("test");
  });
});
