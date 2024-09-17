import { injectable } from "inversify";
import AvatarViewModel from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";
import CharacterAnimationActions from "../CharacterAnimator/CharacterAnimationActions";
import { Vector3 } from "@babylonjs/core";

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

  public get AvatarPosition(): Vector3 {
    return this.viewModel.parentNode?.position;
  }

  onStoryElementCutSceneTriggered(): void {
    this.viewModel.inputEnabled.Value = false;
  }

  onStoryElementCutSceneFinished(): void {
    this.viewModel.inputEnabled.Value = true;
  }

  public onLearningElementLoaded(learningElementTO: LearningElementTO): void {
    this.viewModel.characterAnimator.transition(
      CharacterAnimationActions.InteractionStarted,
    );
  }
}
