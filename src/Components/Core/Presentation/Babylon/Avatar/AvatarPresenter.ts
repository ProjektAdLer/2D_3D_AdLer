import { injectable } from "inversify";
import AvatarViewModel, { AvatarAnimationAction } from "./AvatarViewModel";
import IAvatarPresenter from "./IAvatarPresenter";
import LearningElementTO from "src/Components/Core/Application/DataTransferObjects/LearningElementTO";

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

  public onLearningElementLoaded(learningElementTO: LearningElementTO): void {
    console.log("AvatarPresenter: onLearningElementLoaded");
    this.viewModel.animationStateMachine.applyAction(
      AvatarAnimationAction.InteractionStarted
    );
  }
}
