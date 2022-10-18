import WorldCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalViewModel";
import WorldCompletionModalController from "../../../../../Core/Presentation/React/SpaceMenu/WorldCompletionModal/WorldCompletionModalController";

describe("WorldCompletionModal", () => {
  test("should set its clicked state in the ViewModel", () => {
    const viewModel = new WorldCompletionModalViewModel();
    const controller = new WorldCompletionModalController(viewModel);
    controller.CloseButtonClicked();
    expect(viewModel.showModal.Value).toBeFalsy();
  });
});
