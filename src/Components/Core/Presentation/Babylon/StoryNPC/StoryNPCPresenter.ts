import { Vector3 } from "@babylonjs/core";
import IStoryNPCPresenter from "./IStoryNPCPresenter";
import StoryNPCViewModel, { StoryNPCState } from "./StoryNPCViewModel";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import ILoggerPort from "src/Components/Core/Application/Ports/Interfaces/ILoggerPort";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import CORE_TYPES from "~DependencyInjection/CoreTypes";
import { LogLevelTypes } from "src/Components/Core/Domain/Types/LogLevelTypes";
import { FocusableTypes } from "../Avatar/AvatarFocusSelection/IAvatarFocusable";

export default class StoryNPCPresenter implements IStoryNPCPresenter {
  private logger: ILoggerPort;

  constructor(private viewModel: StoryNPCViewModel) {
    this.logger = CoreDIContainer.get<ILoggerPort>(CORE_TYPES.ILogger);
  }

  getFocusableCenterPosition(): Vector3 {
    return this.viewModel.parentNode.position;
  }

  changeStateFromStopToRandomMovement() {
    if (this.viewModel.state.Value === StoryNPCState.Stop)
      this.viewModel.state.Value = StoryNPCState.RandomMovement;
  }
  getType(): { type: FocusableTypes } {
    if (this.viewModel.storyType === StoryElementType.Outro) {
      return { type: FocusableTypes.outroStory };
    } else return { type: FocusableTypes.introStory };
  }

  onFocused(): void {
    this.viewModel.isInteractable.Value = true;
  }
  isSpecialFocused(): boolean {
    return this.viewModel.isSpecialFocused;
  }

  onSpecialFocused(): void {
    this.viewModel.isSpecialFocused = true;
  }

  onSpecialUnfocused(): void {
    this.viewModel.isSpecialFocused = false;
  }

  onUnfocused(): void {
    this.viewModel.isInteractable.Value = false;
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
      `StoryNPCPresenter (onStoryElementCutSceneTriggered): ${this.viewModel.storyType} Cutscene triggered`,
    );
  }

  onStoryElementCutSceneFinished(): void {
    // go back to walking after own cutscene is finished
    if (this.viewModel.state.Value === StoryNPCState.CutScene) {
      this.viewModel.state.Value = StoryNPCState.RandomMovement;
      this.logger.log(
        LogLevelTypes.INFO,
        `StoryNPCPresenter (onStoryElementCutSceneFinished): ${this.viewModel.storyType} Cutscene finished`,
      );
    }
  }
}
