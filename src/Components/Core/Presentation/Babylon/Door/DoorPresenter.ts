import { Vector3 } from "@babylonjs/core";
import DoorViewModel from "./DoorViewModel";
import IDoorPresenter from "./IDoorPresenter";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import IBottomTooltipPresenter from "~ReactComponents/LearningSpaceDisplay/BottomTooltip/IBottomTooltipPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IExitModalPresenter from "~ReactComponents/LearningSpaceDisplay/ExitModal/IExitModalPresenter";

export default class DoorPresenter implements IDoorPresenter {
  private bottomTooltipPresenter: IBottomTooltipPresenter;
  private exitModalPresenter: IExitModalPresenter;

  constructor(private viewModel: DoorViewModel) {
    if (!this.viewModel) {
      throw new Error("ViewModel was passed as undefined");
    }

    this.bottomTooltipPresenter = CoreDIContainer.get<IBottomTooltipPresenter>(
      PRESENTATION_TYPES.IBottomTooltipPresenter
    );
    this.exitModalPresenter = CoreDIContainer.get<IExitModalPresenter>(
      PRESENTATION_TYPES.IExitModalPresenter
    );
  }

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(position, this.viewModel.position);

    if (distance <= interactionRadius) {
      this.bottomTooltipPresenter.display(
        this.viewModel.isExit ? "Ausgangstüre" : "Eingangstüre"
      );
      this.viewModel.isInteractable.Value = true;
    } else if (this.viewModel.isInteractable.Value) {
      this.bottomTooltipPresenter.hide();
      this.viewModel.isInteractable.Value = false;
    }
  }

  onLearningSpaceScored(spaceScoreTO: LearningSpaceScoreTO): void {
    if (spaceScoreTO.spaceID !== this.viewModel.spaceID) return;
    if (
      this.viewModel.isExit &&
      spaceScoreTO.currentScore >= spaceScoreTO.requiredScore
    )
      this.openDoor();
  }

  openDoor(): void {
    this.viewModel.isOpen.Value = true;
  }
}
