import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IStoryElementPresenter extends ILearningWorldAdapter {
  open(): void;
  openThroughOutroSequence(): void;
  onLearningSpaceLoaded(learningSpaceTO: LearningSpaceTO): void;
}
