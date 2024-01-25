import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import INavigation from "../Navigation/INavigation";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel from "./StoryNPCViewModel";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import bind from "bind-decorator";
import { Vector3 } from "@babylonjs/core";
import IStoryElementPresenter from "~ReactComponents/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class StoryNPCController implements IStoryNPCController {
  private navigation: INavigation;

  constructor(private viewModel: StoryNPCViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);

    this.viewModel.storyElementPresenter =
      CoreDIContainer.get<IStoryElementPresenter>(
        PRESENTATION_TYPES.IStoryElementPresenter
      );
  }

  @bind
  picked(): void {
    if (this.viewModel.isInteractable.Value) {
      this.viewModel.storyElementPresenter.open(this.viewModel.storyType);
    }
  }

  @bind
  setRandomMovementTarget() {
    let target: Vector3;
    let distance: number = 0;
    do {
      target = this.navigation.Plugin.getRandomPointAround(
        this.viewModel.parentNode.position,
        this.viewModel.movementRange
      );
      distance = Vector3.Distance(target, this.viewModel.parentNode.position);
    } while (distance < this.viewModel.minMovementDistance);

    this.viewModel.characterNavigator.startMovement(
      target,
      this.startIdleTimeout
    );
  }

  @bind
  private startIdleTimeout(): void {
    this.viewModel.idleTimer = setTimeout(() => {
      if (!this.viewModel.isInCutScene.Value) {
        this.setRandomMovementTarget();
      }
    }, this.viewModel.idleTime);
  }
}
