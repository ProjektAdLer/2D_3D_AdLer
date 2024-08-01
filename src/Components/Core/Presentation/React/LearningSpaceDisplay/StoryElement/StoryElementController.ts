import bind from "bind-decorator";
import IStoryElementController from "./IStoryElementController";
import StoryElementViewModel from "./StoryElementViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IEndStoryElementCutScene from "src/Components/Core/Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";

export default class StoryElementController implements IStoryElementController {
  constructor(private viewModel: StoryElementViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;

    if (this.viewModel.isOutroCutsceneRunning.Value) {
      this.viewModel.isOutroCutsceneRunning.Value = false;
      CoreDIContainer.get<IEndStoryElementCutScene>(
        USECASE_TYPES.IEndStoryElementCutSceneUseCase
      ).execute();
    }
  }

  @bind
  onIntroButtonClicked(): void {
    this.viewModel.storyTypeToDisplay.Value = StoryElementType.Intro;
  }

  @bind
  onOutroButtonClicked(): void {
    this.viewModel.storyTypeToDisplay.Value = StoryElementType.Outro;
  }

  @bind
  onBackToSelectionButtonClicked(): void {
    this.viewModel.storyTypeToDisplay.Value = StoryElementType.IntroOutro;
  }
}
