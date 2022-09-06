import { logger } from "../../../../../Lib/Logger";
import HeaderBarController from "../../../../Core/Presentation/React/HeaderBar/HeaderBarController";

jest.mock("../../../../../Lib/Logger.ts");

describe("HeaderBarController", () => {
  let systemUnderTest: HeaderBarController;

  beforeEach(() => {
    systemUnderTest = new HeaderBarController();
  });

  test("onMenuButtonClicked calls logger.warn", () => {
    systemUnderTest.onMenuButtonClicked();
    expect(logger.warn).toBeCalled();
  });

  test("onBackButtonClicked calls logger.warn", () => {
    systemUnderTest.onBackButtonClicked();
    expect(logger.warn).toBeCalled();
  });
});
