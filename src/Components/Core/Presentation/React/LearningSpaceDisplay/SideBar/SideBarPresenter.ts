import LearningWorldTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldTO";
import ISideBarPresenter from "./ISideBarPresenter";
import SideBarViewModel from "./SideBarViewModel";
import LearningWorldScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningWorldScoreTO";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import LearningSpaceScoreTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceScoreTO";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class SideBarPresenter implements ISideBarPresenter {
  constructor(private viewModel: SideBarViewModel) {}

  onLearningWorldLoaded(world: LearningWorldTO): void {
    this.viewModel.allowWorldCompletionModalButtonClick = world.spaces.every(
      (space) => space.currentScore >= space.requiredScore,
    );
  }

  onLearningWorldScored(learningWorldScoreTO: LearningWorldScoreTO): void {
    this.viewModel.allowWorldCompletionModalButtonClick =
      learningWorldScoreTO.currentScore >= learningWorldScoreTO.requiredScore;
  }

  onNarrativeFrameworkInfoLoadedOrUpdated(
    narrativeFrameworkTO: NarrativeFrameworkTO,
  ): void {
    this.viewModel.allowNarrativeFrameworkIntroButtonClick.Value = true;
  }

  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void {
    // Reset story button states
    this.viewModel.hasIntroStory = false;
    this.viewModel.hasOutroStory = false;
    this.viewModel.allowIntroStoryButtonClick = false;
    this.viewModel.allowOutroStoryButtonClick = false;

    // Check if space has story elements
    if (
      learningSpaceTO.storyElements &&
      learningSpaceTO.storyElements.length > 0
    ) {
      for (const storyElement of learningSpaceTO.storyElements) {
        if (
          (storyElement.storyType & StoryElementType.Intro) ===
          StoryElementType.Intro
        ) {
          this.viewModel.hasIntroStory = true;
          this.viewModel.allowIntroStoryButtonClick = true; // Intro is always accessible
        }
        if (
          (storyElement.storyType & StoryElementType.Outro) ===
          StoryElementType.Outro
        ) {
          this.viewModel.hasOutroStory = true;
          // Outro is only accessible if space is completed
          this.viewModel.allowOutroStoryButtonClick =
            learningSpaceTO.currentScore >= learningSpaceTO.requiredScore;
        }
      }
    }
  }

  onLearningSpaceScored(learningSpaceScoreTO: LearningSpaceScoreTO): void {
    // Update outro accessibility when space score changes
    if (this.viewModel.hasOutroStory) {
      this.viewModel.allowOutroStoryButtonClick =
        learningSpaceScoreTO.currentScore >= learningSpaceScoreTO.requiredScore;
    }
  }
}
