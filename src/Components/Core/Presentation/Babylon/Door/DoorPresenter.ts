import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "~ReactComponents/LearningSpaceDisplay/ExitModal/IExitModalPresenter";

export default class DoorPresenter implements IDoorPresenter {
  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }
  }

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(position, this.viewModel.position);

    if (distance <= interactionRadius)
      this.viewModel.isInteractable.Value = true;
    else this.viewModel.isInteractable.Value = false;
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID !== this.viewModel.spaceID) return;
    if (
      this.viewModel.isExit &&
      spaceScoreTO.currentScore >= spaceScoreTO.requiredScore
    )
      this.viewModel.isOpen.Value = true;
  }
}
