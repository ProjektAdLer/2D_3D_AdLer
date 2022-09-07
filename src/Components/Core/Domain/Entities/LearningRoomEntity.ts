import { LearningComponentID } from "../Types/EntityTypes";
import LearningElementEntity from "./LearningElementEntity";

export default class LearningRoomEntity {
  public id: LearningComponentID;
  public name: string;
  public learningElements: LearningElementEntity[];
}
