import StoryElementTO from "src/Components/Core/Application/DataTransferObjects/StoryElementTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default interface IStoryElementPresenter extends ILearningWorldAdapter {
  open(type: StoryElementType): void;
}
