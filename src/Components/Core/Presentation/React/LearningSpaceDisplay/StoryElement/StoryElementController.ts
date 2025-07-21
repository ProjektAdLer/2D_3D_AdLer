import bind from "bind-decorator";
import IStoryElementController from "./IStoryElementController";
import StoryElementViewModel from "./StoryElementViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IEndStoryElementCutScene from "src/Components/Core/Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { StoryElementType } from "src/Components/Core/Domain/Types/StoryElementType";
import IStoryNPCPresenter from "../../../Babylon/StoryNPC/IStoryNPCPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class StoryElementController implements IStoryElementController {
  constructor(private viewModel: StoryElementViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;

    if (
      this.viewModel.isIntroCutsceneRunning.Value ||
      this.viewModel.isOutroCutsceneRunning.Value
    ) {
      this.viewModel.isOutroCutsceneRunning.Value = false;
      this.viewModel.isIntroCutsceneRunning.Value = false;

      CoreDIContainer.get<IEndStoryElementCutScene>(
        USECASE_TYPES.IEndStoryElementCutSceneUseCase,
      ).execute({ storyType: this.viewModel.storyTypeToDisplay.Value });
    } else {
      CoreDIContainer.get<IStoryNPCPresenter>(
        PRESENTATION_TYPES.IStoryNPCPresenter,
      ).changeStateFromStopToRandomMovement();
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
