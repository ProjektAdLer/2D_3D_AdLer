import NarrativeFrameworkLearningSpaceContainerPresenter from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerPresenter";
import NarrativeFrameworkLearningSpaceContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerViewModel";

describe("NarrativeFrameworkLearningSpaceContainerPresenter", () => {
  let systemUnderTest: NarrativeFrameworkLearningSpaceContainerPresenter;
  let viewModel: NarrativeFrameworkLearningSpaceContainerViewModel;

  beforeEach(() => {
    viewModel = new NarrativeFrameworkLearningSpaceContainerViewModel();
    systemUnderTest = new NarrativeFrameworkLearningSpaceContainerPresenter(
      viewModel,
    );
  });

  test("openModal should set viewModel Data accordingly", () => {
    viewModel.isOpen.Value = false;
    systemUnderTest.openModal();
    expect(viewModel.isOpen.Value).toBe(true);
  });
});
