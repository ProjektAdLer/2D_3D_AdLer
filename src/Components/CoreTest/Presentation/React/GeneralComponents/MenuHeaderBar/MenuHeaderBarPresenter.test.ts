import WorldTO from "../../../../../Core/Application/DataTransferObjects/WorldTO";
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
    systemUnderTest.onWorldLoaded({ name: "test" } as Partial<WorldTO>);
    expect(systemUnderTest["viewModel"].title.Value).toBe("test");
  });
});
