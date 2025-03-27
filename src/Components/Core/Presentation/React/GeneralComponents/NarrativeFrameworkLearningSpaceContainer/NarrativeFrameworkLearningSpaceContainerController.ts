import bind from "bind-decorator";
import INarrativeFrameworkLearningSpaceContainerController from "./INarrativeFrameworkLearningSpaceContainerController";
import NarrativeFrameworkLearningSpaceContainerViewModel from "./NarrativeFrameworkLearningSpaceContainerViewModel";

export default class NarrativeFrameworkLearningSpaceContainerController
  implements INarrativeFrameworkLearningSpaceContainerController
{
  constructor(
    private viewModel: NarrativeFrameworkLearningSpaceContainerViewModel,
  ) {}
  @bind
  closeModal(): void {
    this.viewModel.isOpen.Value = false;
  }
}
