import { logger } from "../../../../../../Lib/Logger";
import HeaderBarController from "../../../../../Core/Presentation/React/SpaceMenu/HeaderBar/HeaderBarController";
import history from "history/browser";

jest.mock("../../../../../../Lib/Logger.ts");
const mockHistoryBack = jest.spyOn(history, "back");

describe("HeaderBarController", () => {
  let systemUnderTest: HeaderBarController;

  beforeEach(() => {
    systemUnderTest = new HeaderBarController();
  });

  test("onMenuButtonClicked calls logger.warn", () => {
    systemUnderTest.onMenuButtonClicked();
    expect(logger.warn).toBeCalled();
  });

  test("onBackButtonClicked calls history.back", () => {
    systemUnderTest.onBackButtonClicked();
    expect(mockHistoryBack).toBeCalled();
  });
});
