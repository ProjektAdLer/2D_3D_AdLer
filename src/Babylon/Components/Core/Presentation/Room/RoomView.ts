import { MeshBuilder, Scene, Vector3 } from "@babylonjs/core";
import { injectable, inject } from "inversify";
import IRoomView from "./IRoomView";
import RoomViewModel from "./RoomViewModel";

@injectable()
export default class RoomView implements IRoomView {
  private viewModel: RoomViewModel;

  constructor(viewModel: RoomViewModel) {
    this.viewModel = viewModel;
  }

  createFloor(scene: Scene): void {
    MeshBuilder.CreatePlane(
      "Floor",
      {
        width: 5 * this.viewModel.RoomScale,
        height: 3.5 * this.viewModel.RoomScale,
      },
      scene
    ).rotate(new Vector3(1, 0, 0), Math.PI / 2);
  }

  createWalls(scene: Scene): void {
    MeshBuilder.CreatePlane(
      "Northwall",
      {
        width: 5 * this.viewModel.RoomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(1, 0, 0), Math.PI)
      .translate(new Vector3(0, 0, 1), -3.5)
      .translate(new Vector3(0, -1, 0), -1.5);

    MeshBuilder.CreatePlane(
      "Eastwall",
      {
        width: 3.5 * this.viewModel.RoomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(0, 1, 0), Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), Math.PI / 2)
      .translate(new Vector3(1, 0, 0), 5)
      .translate(new Vector3(0, 1, 0), 1.5);

    MeshBuilder.CreatePlane(
      "Southwall",
      {
        width: 5 * this.viewModel.RoomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(1, 0, 0), -Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), -Math.PI / 2)
      .translate(new Vector3(0, 1, 0), 1.5);

    MeshBuilder.CreatePlane(
      "Westwall",
      {
        width: 3.5 * this.viewModel.RoomScale,
        height: 3,
      },
      scene
    )
      .rotate(new Vector3(0, 1, 0), -Math.PI / 2)
      .rotate(new Vector3(0, 0, 1), -Math.PI / 2)
      .translate(new Vector3(1, 0, 0), -5)
      .translate(new Vector3(0, 1, 0), 1.5);
  }
}
