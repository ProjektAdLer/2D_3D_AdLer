import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel from "./StoryNPCViewModel";
import StoryElementTextTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTextTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";

export default class StoryNPCPresenter implements IStoryNPCPresenter {
  constructor(private viewModel: StoryNPCViewModel) {}

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(
      position,
      this.viewModel.parentNode.position
    );

    if (distance <= interactionRadius)
      this.viewModel.isInteractable.Value = true;
    else this.viewModel.isInteractable.Value = false;
  }

  onStoryElementLoaded(storyElementTextTO: StoryElementTextTO): void {
    this.viewModel.isIntro =
      storyElementTextTO.introTexts !== undefined &&
      storyElementTextTO.introTexts.length > 0;
    this.viewModel.isOutro =
      storyElementTextTO.outroTexts !== undefined &&
      storyElementTextTO.outroTexts.length > 0;
  }

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.viewModel.isInCutScene = learningSpaceTO.currentScore === 0;
    console.log("InCutScene: ", this.viewModel.isInCutScene);
  }

  onLearningSpaceScored(learningSpaceScoreTO: LearningSpaceScoreTO): void {
    // TODO: what if current == required but element was answered incorrectly? => unnecessary outro?
    this.viewModel.isInCutScene =
      learningSpaceScoreTO.currentScore === learningSpaceScoreTO.requiredScore;
    console.log("InCutScene: ", this.viewModel.isInCutScene);
  }
}
