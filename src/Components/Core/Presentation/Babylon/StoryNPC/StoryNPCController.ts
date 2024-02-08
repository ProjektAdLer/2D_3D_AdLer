import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import IStoryNPCController from "./IStoryNPCController";
import StoryNPCViewModel from "./StoryNPCViewModel";
import bind from "bind-decorator";
import IStoryElementPresenter from "~ReactComponents/LearningSpaceDisplay/StoryElement/IStoryElementPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

export default class StoryNPCController implements IStoryNPCController {
  constructor(private viewModel: StoryNPCViewModel) {
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
}
