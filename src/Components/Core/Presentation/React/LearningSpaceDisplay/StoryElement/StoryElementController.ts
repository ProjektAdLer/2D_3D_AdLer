import bind from "bind-decorator";
import IStoryElementController from "./IStoryElementController";
import StoryElementViewModel from "./StoryElementViewModel";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IEndStoryElementCutScene from "src/Components/Core/Application/UseCases/EndStoryElementCutScene/IEndStoryElementCutSceneUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

export default class StoryElementController implements IStoryElementController {
  constructor(private viewModel: StoryElementViewModel) {}

  @bind
  closePanel(): void {
    this.viewModel.isOpen.Value = false;
    CoreDIContainer.get<IEndStoryElementCutScene>(
      USECASE_TYPES.IEndStoryElementCutSceneUseCase
    ).execute();
  }

  @bind
  increasePageId(): void {
    this.viewModel.pageId.Value++;
  }
  @bind
  decreasePageId(): void {
    this.viewModel.pageId.Value--;
  }
  @bind
  onIntroButtonClicked(): void {
    this.viewModel.showOnlyIntro.Value = true;
  }
  @bind
  onOutroButtonClicked(): void {
    this.viewModel.showOnlyOutro.Value = true;
  }
  @bind
  backToMenuButtonClicked(): void {
    this.viewModel.showOnlyIntro.Value = false;
    this.viewModel.showOnlyOutro.Value = false;
  }
}
