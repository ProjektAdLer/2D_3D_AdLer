import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

export default class StoryElementPresenter implements IStoryElementPresenter {
  constructor(private viewModel: StoryElementViewModel) {}

  open(): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.pageId.Value = 0;
    this.viewModel.showOnlyIntro.Value = false;
    this.viewModel.showOnlyOutro.Value = false;
  }
  openThroughOutroSequence(): void {
    this.viewModel.outroJustNowUnlocked.Value = true;
    this.viewModel.outroUnlocked.Value = true;
    this.viewModel.isOpen.Value = true;
    this.viewModel.pageId.Value = 0;
  }

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    // this.viewModel.type.Value = learningSpaceTO.storyElements.storyType;
    // this.viewModel.introTexts.Value =
    //   learningSpaceTO.storyElements.introStoryTexts;
    // this.viewModel.outroTexts.Value =
    //   learningSpaceTO.storyElements.outroStoryTexts;
    // if (learningSpaceTO.currentScore >= learningSpaceTO.requiredScore) {
    //   this.viewModel.outroUnlocked.Value = true;
    // }
  }
}
