import NarrativeFrameworkPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkPresenter";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";

let systemUnderTest: NarrativeFrameworkPresenter;
const vm = new NarrativeFrameworkViewModel();

describe("NarrativeFrameworkPresenter", () => {
  test("onNarrativeFrameworkInfoLoaded writes  and outro text strings in viewmodel", () => {
    vm.introText = "test";
    vm.outroText = "test";
    vm.theme = "test";
    systemUnderTest = new NarrativeFrameworkPresenter(vm);
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated({
      introText: "test5",
      outroText: "test7",
      theme: "test3",
    });
    expect(systemUnderTest["viewModel"].introText).toBe("test5");
    expect(systemUnderTest["viewModel"].outroText).toBe("test7");
    expect(systemUnderTest["viewModel"].theme).toBe("test3");
  });
});
