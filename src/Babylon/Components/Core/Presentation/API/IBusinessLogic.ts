import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

export default interface IBusinessLogic {
  get RoomSize(): ROOMSIZE;
}
