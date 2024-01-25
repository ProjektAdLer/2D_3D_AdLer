import StoryElementTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IStoryElementPresenter extends ILearningWorldAdapter {
  open(): void;
  openThroughOutroSequence(): void;
  onStoryElementLoaded(storyElementTO: StoryElementTO): void;
}
