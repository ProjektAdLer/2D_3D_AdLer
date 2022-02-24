import { injectable, inject } from "inversify";
import DataTransferObject from "../../Entities/API/DataTransferObject";
import IRoomConfigurator from "./IRoomConfigurator";

@injectable()
export default class RoomConfigurator implements IRoomConfigurator {
  private roomElementCount: number;
  private roomSize: string;
  constructor(
    @inject(DataTransferObject) dataTransferObject: DataTransferObject
  ) {
    this.roomElementCount = dataTransferObject.ElementCount;

    this.roomElementCount &&
      (this.roomSize = this.determineRoomSize(this.roomElementCount));
  }

  get RoomSize(): string {
    return this.roomSize;
  }

  determineRoomSize(elementCount: number): string {
    let roomSize: string = "";
    switch (elementCount) {
      case 1:
      case 2:
      case 3:
      case 4:
        roomSize = "small";
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        roomSize = "medium";
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        roomSize = "large";
        break;
      default:
        throw Error("Invalid Roomsize");
    }
    return roomSize;
  }
}
