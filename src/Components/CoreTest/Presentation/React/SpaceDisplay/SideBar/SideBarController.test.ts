import SideBarController from "../../../../../Core/Presentation/React/SpaceDisplay/SideBar/SideBarController";
import history from "history/browser";

const mockHistoryBack = jest.spyOn(history, "back");

describe("SideBarController", () => {
  let systemUnderTest: SideBarController;

  beforeEach(() => {
    systemUnderTest = new SideBarController();
  });

  test("onExitButtonClicked calls history.back", () => {
    systemUnderTest.onExitButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});