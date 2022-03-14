import { injectable, inject } from "inversify";
import DataTransferObject from "../../Entities/ExternalRoomData";
import IRoomConfigurator from "./IRoomConfigurator";

export enum ROOMSIZE {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
}

@injectable()
export default class RoomConfigurator implements IRoomConfigurator {
  private roomElementCount: number;
  private roomSize: ROOMSIZE;

  constructor(
    @inject(DataTransferObject) dataTransferObject: DataTransferObject
  ) {
    this.roomElementCount = dataTransferObject.ElementCount;

    this.roomElementCount &&
      (this.roomSize = this.determineRoomSize(this.roomElementCount));
    console.log("room config: roomsize", this.roomSize);
  }

  get RoomSize(): ROOMSIZE {
    return this.roomSize;
  }

  private determineRoomSize(elementCount: number): ROOMSIZE {
    let roomSize;
    switch (elementCount) {
      case 1:
      case 2:
      case 3:
      case 4:
        roomSize = ROOMSIZE.Small;
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        roomSize = ROOMSIZE.Medium;
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        roomSize = ROOMSIZE.Large;
        break;
      default:
        throw Error("Invalid Roomsize");
    }
    return roomSize;
  }
}
