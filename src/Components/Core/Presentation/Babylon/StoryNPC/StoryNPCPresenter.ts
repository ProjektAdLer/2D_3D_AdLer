import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";

export default class StoryNPCPresenter implements IStoryNPCPresenter {
  constructor(private viewModel: StoryNPCViewModel) {}

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(
      position,
      this.viewModel.parentNode.position
    );

    this.viewModel.avatarPosition = position;

    if (distance <= interactionRadius) {
      this.viewModel.isInteractable.Value = true;
    } else this.viewModel.isInteractable.Value = false;
  }

  onStoryElementCutSceneTriggered(enableInput: boolean): void {
    if (enableInput) {
      this.viewModel.isInCutScene.Value = false;
      return;
    }

    let movementVector = this.viewModel.avatarPosition.subtract(
      this.viewModel.parentNode.position
    );
    movementVector.normalize();
    movementVector = movementVector.scale(1.5);
    const target = this.viewModel.avatarPosition.subtract(movementVector);

    // go to avatar
    setTimeout(() => {
      this.viewModel.characterNavigator.startMovement(target, () => {
        this.viewModel.isInteractable.Value = true; // trigger observer
        this.viewModel.isInteractable.Value = false; // reset
      });
    }, 3000);
  }

  onLearningSpaceScored(learningSpaceScoreTO: LearningSpaceScoreTO): void {
    // TODO: what if current == required but element was answered incorrectly? => unnecessary outro?
    this.viewModel.isInCutScene.Value =
      learningSpaceScoreTO.currentScore === learningSpaceScoreTO.requiredScore;
    if (this.viewModel.isInCutScene) {
      console.log("NPC Cutscene: last element finished");
      return;
    }

    console.log("No Cutscene in StoryNPC");
  }
}
