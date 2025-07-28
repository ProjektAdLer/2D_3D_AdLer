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
      // Only try to change NPC state if NPC presenter is available and not ambiguous
      try {
        if (CoreDIContainer.isBound(PRESENTATION_TYPES.IStoryNPCPresenter)) {
          CoreDIContainer.get<IStoryNPCPresenter>(
            PRESENTATION_TYPES.IStoryNPCPresenter,
          ).changeStateFromStopToRandomMovement();
        }
      } catch (error) {
        // Ignore errors when NPC presenter is not available or ambiguous
        // This can happen when story modal is opened via sidebar and NPC has already exited
        console.debug(
          "StoryElementController: Could not access StoryNPCPresenter, likely because modal was opened via sidebar and NPC has exited",
          error,
        );
      }
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
