import LearningWorldCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalViewModel";
import LearningWorldCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceMenu/LearningWorldCompletionModal/LearningWorldCompletionModalController";

describe("LearningWorldCompletionModal", () => {
  test("should set its clicked state in the ViewModel", () => {
    const viewModel = new LearningWorldCompletionModalViewModel();
    const controller = new LearningWorldCompletionModalController(viewModel);
    controller.CloseButtonClicked();
    expect(viewModel.showModal.Value).toBeFalsy();
  });
});
