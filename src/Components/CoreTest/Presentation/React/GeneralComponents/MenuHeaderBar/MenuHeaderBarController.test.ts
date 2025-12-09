import MenuHeaderBarController from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarController";
import history from "~ReactEntryPoint/history";

const mockHistoryBack = jest.spyOn(history, "back");
const mockHistoryPush = jest.spyOn(history, "push");

describe("MenuHeaderBarController", () => {
  let systemUnderTest: MenuHeaderBarController;

  beforeEach(() => {
    systemUnderTest = new MenuHeaderBarController();
  });

  test("onHomeButtonClicked calls history.push with /", () => {
    systemUnderTest.onHomeButtonClicked();
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });

  test("onLearningWorldButtonClicked calls history.push with '/worldmenu'", () => {
    systemUnderTest.onLearningWorldButtonClicked();
    expect(mockHistoryPush).toHaveBeenCalledWith("/worldmenu");
  });

  test("onBackButtonClicked calls history.back", () => {
    systemUnderTest.onBackButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});
