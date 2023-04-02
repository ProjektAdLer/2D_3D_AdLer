import LearningSpaceCompletionModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalController";
import LearningSpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/LearningSpaceDisplay/LearningSpaceCompletionModal/LearningSpaceCompletionModalViewModel";
import history from "history/browser";

describe("LearningSpaceCompletionModalController", () => {
  let viewModel: LearningSpaceCompletionModalViewModel;
  let systemUnderTest: LearningSpaceCompletionModalController;

  beforeEach(() => {
    viewModel = new LearningSpaceCompletionModalViewModel();
    systemUnderTest = new LearningSpaceCompletionModalController(viewModel);
  });

  test("ReturnLearningSpaceMenuButtonClicked should push /spacemenu to history", () => {
    const historyPushSpy = jest.spyOn(history, "push");

    systemUnderTest.ReturnLearningSpaceMenuButtonClicked();

    expect(historyPushSpy).toHaveBeenCalledWith("/spacemenu");
  });

  test("CloseButtonClicked should set showModal in the viewmodel to false", () => {
    systemUnderTest.CloseButtonClicked();

    expect(viewModel.showModal.Value).toBe(false);
  });
});
