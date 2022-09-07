import { LearningComponentID } from "../../Domain/Types/EntityTypes";
import LearningElementTO from "./LearningElementTO";

export default class LearningRoomTO {
  id: LearningComponentID;
  name: string;
  learningElements: LearningElementTO[];
}
