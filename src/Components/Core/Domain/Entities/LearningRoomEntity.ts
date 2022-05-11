import { LearningComponentID } from "./../../Types/EnitityTypes";
import LearningElementEntity from "./LearningElementEntity";

export default class LearningRoomEntity {
  public id: LearningComponentID;
  public learningElements: LearningElementEntity[];
}
