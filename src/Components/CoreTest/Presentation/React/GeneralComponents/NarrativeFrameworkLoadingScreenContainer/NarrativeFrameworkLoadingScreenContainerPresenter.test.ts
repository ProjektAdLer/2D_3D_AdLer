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

  test("onNarrativeFrameworkInfoLoadedOrUpdated should set viewModel Data accordingly", () => {
    systemUnderTest.onNarrativeFrameworkInfoLoadedOrUpdated({
      shownBefore: false,
    });
    expect(viewModel.isShowingContent.Value).toBe(true);
  });
});
