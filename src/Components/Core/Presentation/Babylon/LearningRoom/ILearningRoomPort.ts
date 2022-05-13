import { LearningRoomTO } from "../../../Application/LoadWorld/ILearningWorldPort";

export default interface ILearningRoomPort {
  presentLearningRoom(learningRommTO: LearningRoomTO): void;

  presentNewScore(score: number, completed: boolean): void;
}
