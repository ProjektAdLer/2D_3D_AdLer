import { Vector3 } from "@babylonjs/core";
import WindowViewModel from "./WindowViewModel";

export default class WindowPresenter {
  constructor(private viewModel: WindowViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }
  presentWindow(position: [Vector3, number]): void {
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
  }
}
