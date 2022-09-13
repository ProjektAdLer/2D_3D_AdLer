import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";

export default interface ILearningRoomDetailPresenter {
  onLearningRoomLoaded(learningRoomTO: LearningRoomTO): void;
}
