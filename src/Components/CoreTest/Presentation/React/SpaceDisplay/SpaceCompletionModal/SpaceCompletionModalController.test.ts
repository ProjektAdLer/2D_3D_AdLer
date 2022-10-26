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

  test("ReturnWorldMenuButtonClicked should push /worldmenu to history", () => {
    const historyPushSpy = jest.spyOn(history, "push");

    systemUnderTest.ReturnWorldMenuButtonClicked();

    expect(historyPushSpy).toHaveBeenCalledWith("/worldmenu");
  });

  test("CloseButtonClicked should set showModal in the viewmodel to false", () => {
    systemUnderTest.CloseButtonClicked();

    expect(viewModel.showModal.Value).toBe(false);
  });
});
