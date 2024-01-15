import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import INavigation from "../Navigation/INavigation";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel from "./StoryNPCViewModel";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import bind from "bind-decorator";
import { Vector3 } from "@babylonjs/core";

export default class StoryNPCController implements IStoryNPCController {
  private navigation: INavigation;

  constructor(private viewModel: StoryNPCViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
  }

  picked(): void {
    if (this.viewModel.isInteractable.Value) console.log("Picked");
  }

  @bind
  setRandomMovementTarget(): void {
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
    setTimeout(() => {
      this.setRandomMovementTarget();
    }, this.viewModel.idleTime);
  }
}
