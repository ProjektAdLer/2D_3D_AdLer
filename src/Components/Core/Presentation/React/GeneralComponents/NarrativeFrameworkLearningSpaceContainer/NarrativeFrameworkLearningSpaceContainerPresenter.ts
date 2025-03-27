import { injectable } from "inversify";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";
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
    console.log("openModal");
    this.viewModel.isOpen.Value = true;
  }
}
