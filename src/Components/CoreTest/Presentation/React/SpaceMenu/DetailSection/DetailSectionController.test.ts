import { logger } from "../../../../../../Lib/Logger";
import history from "history/browser";
import DetailSectionController from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionController";

jest.mock("../../../../../../Lib/Logger.ts");
const mockHistoryPush = jest.spyOn(history, "push");

describe("DetailSectionController", () => {
  let systemUnderTest: DetailSectionController;

  beforeEach(() => {
    systemUnderTest = new DetailSectionController();
  });

  test("onSpaceButtonClicked calls logger.warn and history.push", () => {
    systemUnderTest.onSpaceButtonClicked();
    expect(logger.warn).toBeCalled();
    expect(mockHistoryPush).toBeCalled();
  });
});
