import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningWorldCompletionModalPresenter
  extends ILearningWorldAdapter {
  openModal(): void;
}
