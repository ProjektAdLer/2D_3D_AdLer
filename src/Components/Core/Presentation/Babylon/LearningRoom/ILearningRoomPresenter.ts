import { LearningRoomTO } from "../../../Ports/LearningWorldPort/ILearningWorldPort";

export default interface ILearningRoomPresenter {
  get LearningRoomId(): number;
  presentLearningRoom(learningRommTO: LearningRoomTO): void;
  openDoor(): void;
}
