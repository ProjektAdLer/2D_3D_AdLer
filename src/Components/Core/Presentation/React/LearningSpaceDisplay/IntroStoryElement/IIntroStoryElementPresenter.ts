import StoryElementTextTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTextTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IIntroStoryElementPresenter
  extends ILearningWorldAdapter {
  open(): void;
  onStoryElementLoaded(storyElementTextTO: StoryElementTextTO): void;
}
