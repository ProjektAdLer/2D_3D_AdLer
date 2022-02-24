import { MeshBuilder, Scene } from "@babylonjs/core";
import { injectable } from "inversify";
import IRoomView from "./IRoomView";

@injectable()
export default class RoomView implements IRoomView {
  createFloor(scene: Scene): void {
    MeshBuilder.CreatePlane(
      "plane",
      {
        width: 20,
        height: 20,
      },
      scene
    );
  }

  createWalls(scene: Scene): void {
    //todo set wall proportions + material
  }
}
