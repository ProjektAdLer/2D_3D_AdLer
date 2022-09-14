import RoomSelectionSectionController from "../../../../../Core/Presentation/React/RoomMenu/RoomSelectionSection/RoomSelectionSectionController";
import { logger } from "../../../../../../Lib/Logger";

jest.mock("src/Lib/Logger");

describe("RoomSelectionSectionController", () => {
  let systemUnderTest: RoomSelectionSectionController;

  beforeEach(() => {
    systemUnderTest = new RoomSelectionSectionController();
  });

  test("onLearningRoomRowClicked warns", () => {
    systemUnderTest.onRoomRowClicked(42);
    expect(logger.warn).toBeCalledTimes(1);
  });
});
