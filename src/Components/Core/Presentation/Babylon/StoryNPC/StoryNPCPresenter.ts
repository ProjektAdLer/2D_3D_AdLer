import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";

export default class StoryNPCPresenter implements IStoryNPCPresenter {
  private logger: ILoggerPort;

  constructor(private viewModel: StoryNPCViewModel) {
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
  }

  changeStateFromStopToRandomMovement() {
    if (this.viewModel.state.Value === StoryNPCState.Stop)
      this.viewModel.state.Value = StoryNPCState.RandomMovement;
  }

  onAvatarPositionChanged(position: Vector3, interactionRadius: number): void {
    const distance = Vector3.Distance(
      position,
      this.viewModel.parentNode.position
    );

    this.viewModel.avatarPosition = position;

    if (distance <= interactionRadius) {
      this.viewModel.isInteractable.Value = true;
    } else this.viewModel.isInteractable.Value = false;
  }

  onStoryElementCutSceneTriggered(storyType: StoryElementType): void {
    // go to idle when another cutscene is started
    if ((this.viewModel.storyType & storyType) !== storyType) {
      this.viewModel.state.Value = StoryNPCState.Idle;
      return;
    }

    this.viewModel.state.Value = StoryNPCState.CutScene;

    this.logger.log(
      LogLevelTypes.INFO,
      `StoryNPCPresenter (onStoryElementCutSceneTriggered): ${this.viewModel.storyType} Cutscene triggered`
    );
  }

  onStoryElementCutSceneFinished(): void {
    // go back to walking after own cutscene is finished
    if (this.viewModel.state.Value === StoryNPCState.CutScene) {
      this.viewModel.state.Value = StoryNPCState.RandomMovement;
      this.logger.log(
        LogLevelTypes.INFO,
        `StoryNPCPresenter (onStoryElementCutSceneFinished): ${this.viewModel.storyType} Cutscene finished`
      );
    }
  }
}
