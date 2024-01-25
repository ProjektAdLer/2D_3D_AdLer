import StoryElementTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTO";
import IStoryElementPresenter from "./IStoryElementPresenter";
import StoryElementViewModel from "./StoryElementViewModel";

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

  onStoryElementLoaded(storyElementTO: StoryElementTO): void {
    this.viewModel.type.Value = storyElementTO.storyType;
    this.viewModel.introTexts.Value = storyElementTO.introStoryTexts;
    this.viewModel.outroTexts.Value = storyElementTO.outroStoryTexts;
  }
}
