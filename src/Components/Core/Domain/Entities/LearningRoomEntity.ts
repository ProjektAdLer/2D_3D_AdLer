import AbstractEntity from "./AbstractEntity";
import LearningElementEntity from "./LearningElementEntity";

export default class LearningRoomEntity extends AbstractEntity {
  public roomId: number;
  public learningElements: LearningElementEntity[];
}
