import { LearningElementType } from "../../Presentation/Babylon/LearningElement/Types/LearningElementTypes";

export class LearningWorldTO {
  readonly id: string;
  worldName: string;
  learningRooms: LearningRoomTO[];
}

export class LearningRoomTO {
  readonly id: string;
  learningElements: LearningElementTO[];
}

export class LearningElementTO {
  readonly id: string;
  type: LearningElementType;
}

export default interface ILearningWorldPort {
  presentLearningWorld(learningWorldTO: LearningWorldTO): void;
}
