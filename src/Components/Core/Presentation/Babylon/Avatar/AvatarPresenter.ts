import { injectable } from "inversify";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import CharacterAnimationActions from "../CharacterAnimator/CharacterAnimationActions";

/**
 * @class AvatarPresenter
 * @description Presenter and Port for the Avatar.
 */
@injectable()
export default class AvatarPresenter implements IAvatarPresenter {
  private viewModel: AvatarViewModel;

  public set ViewModel(newViewModel: AvatarViewModel) {
    this.viewModel = newViewModel;
  }

  onStoryElementCutSceneTriggered(enableInput: boolean): void {
    this.viewModel.inputEnabled.Value = enableInput;
  }

  public onLearningElementLoaded(learningElementTO: LearningElementTO): void {
    this.viewModel.characterAnimator.transition(
      CharacterAnimationActions.InteractionStarted
    );
  }
}
