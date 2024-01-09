import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import INavigation from "../Navigation/INavigation";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel from "./StoryNPCViewModel";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import bind from "bind-decorator";

export default class StoryNPCController implements IStoryNPCController {
  private navigation: INavigation;

  constructor(private viewModel: StoryNPCViewModel) {
    this.navigation = CoreDIContainer.get<INavigation>(CORE_TYPES.INavigation);
  }

  picked(): void {
    if (this.viewModel.isInteractable.Value) console.log("Picked");
  }

  @bind
  setMovementTarget(): void {
    const randomTarget = this.navigation.Plugin.getRandomPointAround(
      this.viewModel.parentNode.position,
      this.viewModel.movementRange
    );
    this.viewModel.characterNavigator.startMovement(
      randomTarget,
      this.startIdling
    );
  }

  @bind
  private startIdling(): void {
    setTimeout(() => {
      this.setMovementTarget();
    }, this.viewModel.idleTime);
  }
}
