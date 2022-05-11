import { LearningComponentID } from "./../../Types/EnitityTypes";
import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";

export class LearningWorldTO {
  worldName: string;
  learningRooms: LearningRoomTO[];
}

export class LearningRoomTO {
  id: LearningComponentID;
  learningElements: LearningElementTO[];
}

export class LearningElementTO {
  id: LearningComponentID;
  type: LearningElementType;
}

export default interface ILearningWorldPort {
  presentLearningWorld(learningWorldTO: LearningWorldTO): void;
}
