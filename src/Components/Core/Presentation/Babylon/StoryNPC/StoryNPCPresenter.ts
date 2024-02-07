import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

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

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    if ((this.viewModel.storyType ?? storyType) !== storyType) return;

    this.viewModel.isInCutScene.Value = true;

    // npc stops in specific distance from avatar
    const targetOffset = this.viewModel.avatarPosition
      .subtract(this.viewModel.parentNode.position)
      .normalize()
      .scale(this.viewModel.cutSceneDistanceFromAvatar);
    const target = this.viewModel.avatarPosition.subtract(targetOffset);

    const isIntro: boolean =
      (storyType & StoryElementType.Intro) === StoryElementType.Intro;

    // go to avatar
    setTimeout(() => {
      this.viewModel.characterNavigator.startMovement(target, () => {
        if (isIntro) {
          this.viewModel.storyElementPresenter.open(StoryElementType.Intro);
        } else {
          this.viewModel.storyElementPresenter.openThroughOutroSequence();
        }
      });
    }, this.viewModel.introCutSceneDelay);
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.isInCutScene.Value = false;
  }
}
