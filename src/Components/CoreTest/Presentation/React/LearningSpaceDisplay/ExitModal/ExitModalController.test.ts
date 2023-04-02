import history from "history/browser";
import ExitModalController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/ExitModal/ExitModalController";

const mockHistoryBack = jest.spyOn(history, "back");

describe("ExitModalController", () => {
  let systemUnderTest: ExitModalController;

  beforeEach(() => {
    systemUnderTest = new ExitModalController();
  });

  test("onExitButtonClicked calls history.back", () => {
    systemUnderTest.onExitButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});
