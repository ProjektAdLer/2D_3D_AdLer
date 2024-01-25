import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import AvatarViewModel from "./AvatarViewModel";

export default interface IAvatarPresenter extends ILearningWorldAdapter {
  set ViewModel(newViewModel: AvatarViewModel);

  onStoryElementCutSceneTriggered(enableInput: boolean): void;
  onStoryElementCutSceneFinished(): void;
}
