import { injectable } from "inversify";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";
import INarrativeFrameworkWorldCompletionModalContainerPresenter from "./INarrativeFrameworkWorldCompletionModalContainerPresenter";
import NarrativeFrameworkWorldCompletionModalContainerViewModel from "./NarrativeFrameworkWorldCompletionModalContainerViewModel";

@injectable()
export default class NarrativeFrameworkWorldCompletionModalContainerPresenter
  implements INarrativeFrameworkWorldCompletionModalContainerPresenter
{
  constructor(
    private viewModel: NarrativeFrameworkWorldCompletionModalContainerViewModel,
  ) {}
  onNarrativeFrameworkInfoLoadedOrUpdated(
    narrativeFrameWorkTO: NarrativeFrameworkTO,
  ): void {
    // set narrative framework to open if it has not been shown before
    this.viewModel.isShowingContent.Value = !narrativeFrameWorkTO.shownBefore;
  }
}
