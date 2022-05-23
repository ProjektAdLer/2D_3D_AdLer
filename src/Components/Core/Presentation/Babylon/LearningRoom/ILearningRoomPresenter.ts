import { LearningRoomTO } from "../../../Application/LoadWorld/ILearningWorldPort";

export default interface ILearningRoomPresenter {
  get LearningRoomId(): number;
  presentLearningRoom(learningRommTO: LearningRoomTO): void;
  openDoor(): void;
}
