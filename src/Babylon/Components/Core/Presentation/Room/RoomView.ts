import { MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { injectable, inject } from "inversify";
import IRoomView from "./IRoomView";
import RoomViewModel from "./RoomViewModel";
import { ROOMSIZE } from "../../BusinessLogic/RoomConfigurator/RoomConfigurator";

@injectable()
export default class RoomView implements IRoomView {
  private roomViewModel: RoomViewModel;
  private roomScale: number;
  constructor(@inject(RoomViewModel) roomViewModel: RoomViewModel) {
    this.roomViewModel = roomViewModel;
  }
  setRoomScale(roomSize: ROOMSIZE): number {
    if (roomSize === ROOMSIZE.Small) return 1;
    else if (roomSize === ROOMSIZE.Medium) return 2;
    else if (roomSize === ROOMSIZE.Large) return 3;
    else throw new Error("Invalid roomSize to scale Room!");
  }
  createFloor(scene: Scene, roomScale: number): void {
    MeshBuilder.CreatePlane(
      "Floor",
      {
        width: 5 * roomScale,
        height: 3.5 * roomScale,
      },
      scene
    );
  }

  createWalls(scene: Scene, roomScale: number): void {
    MeshBuilder.CreatePlane(
      "Northwall",
      {
        width: 5 * roomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(1, 0, 0), Math.PI / 2)
      .translate(new Vector3(0, 0, 1), 3.5);
    MeshBuilder.CreatePlane(
      "Eastwall",
      {
        width: 3.5 * roomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(0, 1, 0), Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), Math.PI / 2)
      .translate(new Vector3(1, 0, 0), 5);
    MeshBuilder.CreatePlane(
      "Southwall",
      {
        width: 5 * roomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(1, 0, 0), -Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), -Math.PI / 2);
    MeshBuilder.CreatePlane(
      "Westwall",
      {
        width: 3.5 * roomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(0, 1, 0), -Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), -Math.PI / 2)
      .translate(new Vector3(1, 0, 0), -5);
  }
}
