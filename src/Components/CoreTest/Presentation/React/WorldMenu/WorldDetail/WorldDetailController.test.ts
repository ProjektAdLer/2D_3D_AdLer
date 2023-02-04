import { logger } from "../../../../../../Lib/Logger";
import history from "history/browser";
import WorldDetailController from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailController";
import WorldDetailViewModel from "../../../../../Core/Presentation/React/WorldMenu/WorldDetail/WorldDetailViewModel";

const mockHistoryPush = jest.spyOn(history, "push");

const vm = new WorldDetailViewModel();

describe("WorldDetailController", () => {
  let systemUnderTest: WorldDetailController;

  beforeEach(() => {
    systemUnderTest = new WorldDetailController(vm);
  });

  test("onWorldButtonClicked calls history.push", () => {
    systemUnderTest.onEnterWorldButtonClicked();
    expect(mockHistoryPush).toBeCalled();
  });
});
