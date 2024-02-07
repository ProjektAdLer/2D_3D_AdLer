import { ValueLineComponent } from "@babylonjs/inspector/lines/valueLineComponent";
import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class StoryElementPresenter implements IStoryElementPresenter {
  constructor(private viewModel: StoryElementViewModel) {}

  open(type: StoryElementType): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.pageId.Value = 0;
    this.viewModel.showOnlyIntro.Value = false;
    this.viewModel.showOnlyOutro.Value = false;

    if (this.viewModel.isSplitStory.Value) {
      this.viewModel.pickedStory.Value = type;
    }
  }
  openThroughOutroSequence(): void {
    this.viewModel.outroJustNowUnlocked.Value = true;
    this.viewModel.outroUnlocked.Value = true;
    this.viewModel.isOpen.Value = true;
    this.viewModel.pageId.Value = 0;
  }

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    this.viewModel.isSplitStory.Value =
      learningSpaceTO.storyElements.length === 2;
    for (let i = 0; i < learningSpaceTO.storyElements.length; i++) {
      this.viewModel.type.Value[i] = learningSpaceTO.storyElements[i].storyType;
      if (
        learningSpaceTO.storyElements[i].introStoryTexts === undefined ||
        learningSpaceTO.storyElements[i].introStoryTexts === null ||
        learningSpaceTO.storyElements[i].introStoryTexts!.length === 0
      ) {
        this.viewModel.introTexts.Value = ["Kein Text vorhanden."];
      } else {
        this.viewModel.introTexts.Value =
          learningSpaceTO.storyElements[i].introStoryTexts!;
      }
      if (
        learningSpaceTO.storyElements[i].outroStoryTexts === undefined ||
        learningSpaceTO.storyElements[i].outroStoryTexts === null ||
        learningSpaceTO.storyElements[i].outroStoryTexts!.length === 0
      ) {
        this.viewModel.outroTexts.Value = ["Kein Text vorhanden."];
      } else {
        this.viewModel.outroTexts.Value =
          learningSpaceTO.storyElements[i].outroStoryTexts!;
      }
      if (learningSpaceTO.storyElements[i].modelType !== null)
        this.viewModel.modelType.Value[i] =
          learningSpaceTO.storyElements[i].modelType!;
    }
    if (learningSpaceTO.currentScore >= learningSpaceTO.requiredScore) {
      this.viewModel.outroUnlocked.Value = true;
    }
  }
}
