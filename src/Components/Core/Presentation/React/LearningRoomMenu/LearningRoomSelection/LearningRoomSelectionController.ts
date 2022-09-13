import { logger } from "src/Lib/Logger";
import ILearningRoomSelectionController from "./ILearningRoomSelectionController";

export default class LearningRoomSelectionController
  implements ILearningRoomSelectionController
{
  onLearningRoomRowClicked(learningRoomId: number): void {
    logger.warn(
      "onLearningRoomRowClicked not implemented yet. Called with " +
        learningRoomId
    );
  }
}
