import { ROOMSIZE } from "./RoomConfigurator";

export default interface IRoomConfigurator {
  get RoomSize(): ROOMSIZE;
}
