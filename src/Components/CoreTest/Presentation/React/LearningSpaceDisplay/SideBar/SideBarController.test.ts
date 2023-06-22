import SideBarController from "../../../../../Core/Presentation/React/LearningSpaceDisplay/SideBar/SideBarController";
import history from "history/browser";

const historyPushMock = jest.spyOn(history, "push");

describe("SideBarController", () => {
  let systemUnderTest: SideBarController;

  beforeEach(() => {
    systemUnderTest = new SideBarController();
  });

  test("onMainMenuButtonClicked calls history.push with '/'", () => {
    systemUnderTest.onMainMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/");
  });

  test("onWorldMenuButtonClicked calls history.push with '/worldmenu'", () => {
    systemUnderTest.onWorldMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/worldmenu");
  });

  test("onSpaceMenuButtonClicked calls history.push with '/spacemenu'", () => {
    systemUnderTest.onSpaceMenuButtonClicked();
    expect(historyPushMock).toBeCalledWith("/spacemenu");
  });
});
