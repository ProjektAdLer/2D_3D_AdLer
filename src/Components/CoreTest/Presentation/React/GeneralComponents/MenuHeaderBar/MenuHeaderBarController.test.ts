import { logger } from "../../../../../../Lib/Logger";
import MenuHeaderBarController from "../../../../../Core/Presentation/React/GeneralComponents/MenuHeaderBar/MenuHeaderBarController";
import history from "history/browser";

jest.mock("../../../../../../Lib/Logger.ts");
const mockHistoryBack = jest.spyOn(history, "back");

describe("MenuHeaderBarController", () => {
  let systemUnderTest: MenuHeaderBarController;

  beforeEach(() => {
    systemUnderTest = new MenuHeaderBarController();
  });

  test("onMenuButtonClicked calls logger.warn", () => {
    systemUnderTest.onMenuButtonClicked();
    expect(logger.warn).toBeCalled();
  });

  test("onLearningWorldButtonClicked calls logger.warn", () => {
    systemUnderTest.onLearningWorldButtonClicked();
    expect(logger.warn).toBeCalled();
  });

  test("onBackButtonClicked calls history.back", () => {
    systemUnderTest.onBackButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });

  test.todo("create tests that check on correct history object");
});
