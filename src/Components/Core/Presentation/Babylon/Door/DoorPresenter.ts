import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { ComponentID } from "src/Components/Core/Domain/Types/EntityTypes";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID !== this.viewModel.spaceID) return;
    if (
      this.viewModel.doorType.Value === "Exit" &&
      spaceScoreTO.currentScore >= spaceScoreTO.requiredScore
    )
      this.openDoor();
  }
  openDoor(): void {
    this.viewModel.isOpen.Value = true;
  }

  presentDoor(
    position: [Vector3, number],
    type: string,
    spaceID: ComponentID
  ): void {
    this.viewModel.position.Value = position[0];
    this.viewModel.rotation.Value = position[1];
    this.viewModel.doorType.Value = type;
    this.viewModel.spaceID = spaceID;
  }
}
