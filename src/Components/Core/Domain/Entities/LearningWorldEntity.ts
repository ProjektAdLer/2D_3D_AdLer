import { injectable } from "inversify";
import AbstractEntity from "./AbstractEntity";
import LearningRoomEntity from "./LearningRoomEntity";

@injectable()
export default class LearningWorldEntity extends AbstractEntity {
  public learningRooms: LearningRoomEntity[];
}
