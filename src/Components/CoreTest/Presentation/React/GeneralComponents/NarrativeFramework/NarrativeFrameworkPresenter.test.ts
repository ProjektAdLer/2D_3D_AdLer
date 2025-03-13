import NarrativeFrameworkPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkPresenter";
import NarrativeFrameworkViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFramework/NarrativeFrameworkViewModel";

let systemUnderTest: NarrativeFrameworkPresenter;
const vm = new NarrativeFrameworkViewModel();

describe("NarrativeFrameworkPresenter", () => {
  test("onNarrativeFrameworkInfoLoaded writes intro and outro text strings in viewmodel", () => {
    vm.introText = "test";
    vm.outroText = "test";
    systemUnderTest = new NarrativeFrameworkPresenter(vm);
    systemUnderTest.onNarrativeFrameworkInfoLoaded({
      introText: "test5",
      outroText: "test7",
    });
    expect(systemUnderTest["viewModel"].introText).toBe("test5");
    expect(systemUnderTest["viewModel"].outroText).toBe("test7");
  });
});
