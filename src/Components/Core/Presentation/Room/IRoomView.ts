import RoomViewModel from "./RoomViewModel";
export default interface IRoomView {
  displayRoom(): void;
  set ViewModel(newViewModel: RoomViewModel);
}
