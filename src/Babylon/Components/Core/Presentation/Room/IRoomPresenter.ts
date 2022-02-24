export default interface IRoomPresenter {
  get RoomSize(): Symbol;
  createFloor(): void;
  createWalls(): void;
}
