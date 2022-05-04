import RoomViewModel from "./LearningRoomViewModel";
export default interface IRoomView {
  displayRoom(): void;
  set ViewModel(newViewModel: RoomViewModel);
}
