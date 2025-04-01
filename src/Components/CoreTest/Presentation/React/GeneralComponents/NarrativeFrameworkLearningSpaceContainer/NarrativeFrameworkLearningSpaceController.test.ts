import NarrativeFrameworkLearningSpaceContainerController from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerController";
import NarrativeFrameworkLearningSpaceContainerViewModel from "../../../../../Core/Presentation/React/GeneralComponents/NarrativeFrameworkLearningSpaceContainer/NarrativeFrameworkLearningSpaceContainerViewModel";

describe("NarrativeFrameworkLearningSpaceContainerController", () => {
  let systemUnderTest: NarrativeFrameworkLearningSpaceContainerController;
  let viewModel: NarrativeFrameworkLearningSpaceContainerViewModel;

  beforeEach(() => {
    viewModel = new NarrativeFrameworkLearningSpaceContainerViewModel();
    systemUnderTest = new NarrativeFrameworkLearningSpaceContainerController(
      viewModel,
    );
  });

  test("closeModal should set viewModel Data accordingly", () => {
    viewModel.isOpen.Value = true;
    systemUnderTest.closeModal();
    expect(viewModel.isOpen.Value).toBe(false);
  });
});
