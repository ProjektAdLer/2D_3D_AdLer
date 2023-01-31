import SpaceCompletionModalController from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalController";
import SpaceCompletionModalViewModel from "../../../../../Core/Presentation/React/SpaceDisplay/SpaceCompletionModal/SpaceCompletionModalViewModel";
import history from "history/browser";

describe("SpaceCompletionModalController", () => {
  let viewModel: SpaceCompletionModalViewModel;
  let systemUnderTest: SpaceCompletionModalController;

  beforeEach(() => {
    viewModel = new SpaceCompletionModalViewModel();
    systemUnderTest = new SpaceCompletionModalController(viewModel);
  });

  test("ReturnWorldMenuButtonClicked should push /spacemenu to history", () => {
    const historyPushSpy = jest.spyOn(history, "push");

    systemUnderTest.ReturnSpaceMenuButtonClicked();

    expect(historyPushSpy).toHaveBeenCalledWith("/spacemenu");
  });

  test("CloseButtonClicked should set showModal in the viewmodel to false", () => {
    systemUnderTest.CloseButtonClicked();

    expect(viewModel.showModal.Value).toBe(false);
  });
});
