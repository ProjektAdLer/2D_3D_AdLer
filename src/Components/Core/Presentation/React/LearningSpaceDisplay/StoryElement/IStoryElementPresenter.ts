import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IStoryElementPresenter extends ILearningWorldAdapter {
  open(): void;
  openThroughOutroSequence(): void;
}
