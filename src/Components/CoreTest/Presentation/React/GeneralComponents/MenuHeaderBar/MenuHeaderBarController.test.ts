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

  test("onWorldButtonClicked calls logger.warn", () => {
    systemUnderTest.onWorldButtonClicked();
    expect(logger.warn).toBeCalled();
  });

  test("onBackButtonClicked calls history.back", () => {
    systemUnderTest.onBackButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});
