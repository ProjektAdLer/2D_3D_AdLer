import { logger } from "src/Lib/Logger";
import IRoomSelectionSectionController from "./IRoomSelectionSectionController";

export default class RoomSelectionSectionController
  implements IRoomSelectionSectionController
{
  onRoomRowClicked(learningRoomId: number): void {
    logger.warn(
      "onLearningRoomRowClicked not implemented yet. Called with " +
        learningRoomId
    );
  }
}
