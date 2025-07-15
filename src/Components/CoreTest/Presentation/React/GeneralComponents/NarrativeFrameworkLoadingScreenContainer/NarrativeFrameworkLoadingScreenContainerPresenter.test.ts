import NarrativeFrameworkTO from "../../../../../Core/Application/DataTransferObjects/NarrativeFrameworkTO";
import NarrativeFrameworkLoadingScreenContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainerPresenter";
import NarrativeFrameworkLoadingScreenContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLoadingScreenContainer/NarrativeFrameworkLoadingScreenContainerViewModel";

describe("NarrativeFrameworkLoadingScreenContainerPresenter", () => {
  let systemUnderTest: NarrativeFrameworkLoadingScreenContainerPresenter;
  let viewModel: NarrativeFrameworkLoadingScreenContainerViewModel;

  beforeEach(() => {
    viewModel = new NarrativeFrameworkLoadingScreenContainerViewModel();
    systemUnderTest = new NarrativeFrameworkLoadingScreenContainerPresenter(
      viewModel,
    );
  });

  test("should show nothing if narrative has been shown before", () => {
    const to = { shownBefore: true } as NarrativeFrameworkTO;
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated(to);
    expect(viewModel.isShowingContent.Value).toBe(false);
    expect(viewModel.showNarrativeFramework.Value).toBe(false);
  });

  test("should show controls explanation if not shown before and no intro text exists", () => {
    const to = {
      shownBefore: false,
      introText: undefined,
    } as NarrativeFrameworkTO;
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated(to);
    expect(viewModel.isShowingContent.Value).toBe(true);
    expect(viewModel.showNarrativeFramework.Value).toBe(false);
  });

  test("should show narrative framework if not shown before and intro text exists", () => {
    const to = {
      shownBefore: false,
      introText: "Some intro text",
    } as NarrativeFrameworkTO;
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated(to);
    expect(viewModel.isShowingContent.Value).toBe(true);
    expect(viewModel.showNarrativeFramework.Value).toBe(true);
  });
});
