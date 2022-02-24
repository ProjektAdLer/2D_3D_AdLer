import { injectable, inject } from "inversify";
import DataTransferObject from "../../Entities/ExternalRoomData";
import IRoomConfigurator from "./IRoomConfigurator";

@injectable()
export default class RoomConfigurator implements IRoomConfigurator {
  private roomElementCount: number;
  private roomSize: any;

  constructor(
    @inject(DataTransferObject) dataTransferObject: DataTransferObject
  ) {
    this.roomElementCount = dataTransferObject.ElementCount;

    this.roomElementCount &&
      (this.roomSize = this.determineRoomSize(this.roomElementCount));
    console.log("room config: roomsize", this.roomSize);
  }

  get RoomSize(): any {
    return this.roomSize;
  }

  determineRoomSize(elementCount: number): any {
    let roomSize;
    switch (elementCount) {
      case 1:
      case 2:
      case 3:
      case 4:
        roomSize = Symbol("Small Room");
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        roomSize = Symbol("Medium Room");
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        roomSize = Symbol("Large Room");
        break;
      default:
        throw Error("Invalid Roomsize");
    }
    return roomSize;
  }
}
