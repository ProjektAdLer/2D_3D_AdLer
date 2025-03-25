import NarrativeFrameworkIntroPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkIntro/NarrativeFrameworkIntroPresenter";
import NarrativeFrameworkIntroViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkIntro/NarrativeFrameworkIntroViewModel";

let systemUnderTest: NarrativeFrameworkIntroPresenter;
const vm = new NarrativeFrameworkIntroViewModel();

describe("NarrativeFrameworkIntroPresenter", () => {
  test("onNarrativeFrameworkIntroInfoLoaded writes intro and outro text strings in viewmodel", () => {
    vm.introText = "test";
    vm.outroText = "test";
    systemUnderTest = new NarrativeFrameworkIntroPresenter(vm);
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated({
      introText: "test5",
      outroText: "test7",
    });
    expect(systemUnderTest["viewModel"].introText).toBe("test5");
    expect(systemUnderTest["viewModel"].outroText).toBe("test7");
  });
});
