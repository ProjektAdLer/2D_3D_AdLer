import LearningRoomTO from "src/Components/Core/Application/DataTransportObjects/LearningRoomTO";

export default interface IDetailSectionPresenter {
  onLearningRoomLoaded(learningRoomTO: LearningRoomTO): void;
}
