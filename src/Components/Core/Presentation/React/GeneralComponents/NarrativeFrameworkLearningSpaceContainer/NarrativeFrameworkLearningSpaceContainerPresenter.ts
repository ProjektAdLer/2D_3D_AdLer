import { injectable } from "inversify";
import bind from "bind-decorator";
import INarrativeFrameworkLearningSpaceContainerPresenter from "./INarrativeFrameworkLearningSpaceContainerPresenter";
import NarrativeFrameworkLearningSpaceContainerViewModel from "./NarrativeFrameworkLearningSpaceContainerViewModel";

@injectable()
export default class NarrativeFrameworkLearningSpaceContainerPresenter
  implements INarrativeFrameworkLearningSpaceContainerPresenter
{
  constructor(
    private viewModel: NarrativeFrameworkLearningSpaceContainerViewModel,
  ) {}

  @bind
  openModal(): void {
    this.viewModel.isOpen.Value = true;
  }
}
