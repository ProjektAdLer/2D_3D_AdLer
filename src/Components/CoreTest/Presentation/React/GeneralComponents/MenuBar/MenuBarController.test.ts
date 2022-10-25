import MenuBarController from "../../../../../Core/Presentation/React/GeneralComponents/MenuBar/MenuBarController";
import history from "history/browser";

const mockHistoryBack = jest.spyOn(history, "back");

describe("MenuBarController", () => {
  let systemUnderTest: MenuBarController;

  beforeEach(() => {
    systemUnderTest = new MenuBarController();
  });

  test("onExitButtonClicked calls history.back", () => {
    systemUnderTest.onExitButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});
