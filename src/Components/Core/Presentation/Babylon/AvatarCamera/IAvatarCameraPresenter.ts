import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

export default interface IAvatarCameraPresenter extends ILearningWorldAdapter {
  onStoryElementCutSceneTriggered(enableInput: boolean): void;
}
