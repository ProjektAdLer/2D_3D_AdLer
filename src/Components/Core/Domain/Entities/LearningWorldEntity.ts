import { injectable } from "inversify";
import LearningRoomEntity from "./LearningRoomEntity";

@injectable()
export default class LearningWorldEntity {
  worldName: string;
  public learningRooms: LearningRoomEntity[];
}
