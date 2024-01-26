import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";

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
    this.viewModel.isInCutScene.Value = true;

    // npc stops in specific distance from avatar
    const targetOffset = this.viewModel.avatarPosition
      .subtract(this.viewModel.parentNode.position)
      .normalize()
      .scale(this.viewModel.cutSceneDistanceFromAvatar);
    const target = this.viewModel.avatarPosition.subtract(targetOffset);

    // go to avatar
    setTimeout(() => {
      this.viewModel.characterNavigator.startMovement(target, () => {
        this.viewModel.storyElementPresenter.open(this.viewModel.storyType);
      });
    }, this.viewModel.introCutSceneDelay);
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.isInCutScene.Value = false;
  }
}
