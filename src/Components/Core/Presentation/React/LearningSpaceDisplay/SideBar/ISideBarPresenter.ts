import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface ISideBarPresenter extends ILearningWorldAdapter {
  onStoryElementCutSceneTriggered(enableInput: boolean): void;
  onStoryElementCutSceneFinished(): void;
}
