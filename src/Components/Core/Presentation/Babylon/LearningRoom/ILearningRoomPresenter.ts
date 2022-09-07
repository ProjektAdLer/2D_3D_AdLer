import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";

export default interface ILearningRoomPresenter {
  get LearningRoomId(): number;
  presentLearningRoom(learningRommTO: LearningRoomTO): void;
  openDoor(): void;
}
