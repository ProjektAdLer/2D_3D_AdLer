import LearningWorldTO from "../../../../../Core/Application/DataTransferObjects/LearningWorldTO";
import MenuHeaderBarPresenter from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarPresenter";
import MenuHeaderBarViewModel from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarViewModel";

let systemUnderTest: MenuHeaderBarPresenter;

describe("MenuHeaderBarPresenter", () => {
  beforeEach(() => {
    const vm = new MenuHeaderBarViewModel();

    vm.currentWorldName.Value = "Lernwelt12354";
    systemUnderTest = new MenuHeaderBarPresenter(vm);
  });

  test("displayWorldTitle sets viewModel variable", () => {
    systemUnderTest.onLearningWorldLoaded({
      name: "test",
    } as Partial<LearningWorldTO>);
    expect(systemUnderTest["viewModel"].currentWorldName.Value).toBe("test");
  });
});
