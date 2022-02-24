export default interface IRoomGenerator {
  get RoomSize(): Symbol;
  createFloor(): void;
  createWalls(): void;
}
