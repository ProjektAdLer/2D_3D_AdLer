import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ILearningSpacePresenter extends ILearningWorldAdapter {
  dispose(): void;
}
