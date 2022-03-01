import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

export default interface IRoomPresenter {
  get RoomSize(): ROOMSIZE;
  createFloor(): void;
  createWalls(): void;
}
