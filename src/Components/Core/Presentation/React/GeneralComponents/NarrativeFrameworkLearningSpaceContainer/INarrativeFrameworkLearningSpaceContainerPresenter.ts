import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface INarrativeFrameworkLearningSpaceContainerPresenter
  extends ILearningWorldAdapter {
  openModal(): void;
}
