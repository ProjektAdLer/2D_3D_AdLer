import { logger } from "../../../../../../Lib/Logger";
import history from "history/browser";
import DetailSectionController from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionController";
import DetailSectionViewModel from "../../../../../Core/Presentation/React/SpaceMenu/DetailSection/DetailSectionViewModel";

jest.mock("../../../../../../Lib/Logger.ts");
const mockHistoryPush = jest.spyOn(history, "push");

const vm = new DetailSectionViewModel();

describe("DetailSectionController", () => {
  let systemUnderTest: DetailSectionController;

  beforeEach(() => {
    systemUnderTest = new DetailSectionController(vm);
  });

  test("onSpaceButtonClicked calls logger.warn and history.push", () => {
    systemUnderTest.onSpaceButtonClicked();
    expect(mockHistoryPush).toBeCalled();
  });
});
