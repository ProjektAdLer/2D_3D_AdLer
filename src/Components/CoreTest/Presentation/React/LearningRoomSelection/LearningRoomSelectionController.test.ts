import LearningRoomSelectionController from "../../../../Core/Presentation/React/LearningRoomSelection/LearningRoomSelectionController";
import { logger } from "../../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

describe("LearningRoomSelectionController", () => {
  let systemUnderTest: LearningRoomSelectionController;

  beforeEach(() => {
    systemUnderTest = new LearningRoomSelectionController();
  });

  test("onLearningRoomRowClicked warns", () => {
    systemUnderTest.onLearningRoomRowClicked(42);
    expect(logger.warn).toBeCalledTimes(1);
  });
});
