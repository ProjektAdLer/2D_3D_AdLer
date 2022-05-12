import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {}
  openDoor(): void {
    this.viewModel.isOpen.Value = true;
  }

  presentDoor(position: [Vector3, number]): void {
    if (!this.viewModel) {
      throw new Error("ViewModel not set");
    }

    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.isVisible.Value = true;
  }
}
