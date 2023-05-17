import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IExitModalPresenter extends ILearningWorldAdapter {
  open(): void;
}
