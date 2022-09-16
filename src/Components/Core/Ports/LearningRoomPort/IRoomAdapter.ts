import LearningRoomTO from "../../Application/DataTransportObjects/LearningRoomTO";

export default interface IRoomAdapter {
  onRoomDataLoaded(learningRoomTO: LearningRoomTO): void;
}
