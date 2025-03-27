import { injectable } from "inversify";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";
import INarrativeFrameworkLoadingScreenContainerPresenter from "./INarrativeFrameworkLoadingScreenContainerPresenter";
import NarrativeFrameworkLoadingScreenContainerViewModel from "./NarrativeFrameworkLoadingScreenContainerViewModel";

@injectable()
export default class NarrativeFrameworkLoadingScreenContainerPresenter
  implements INarrativeFrameworkLoadingScreenContainerPresenter
{
  constructor(
    private viewModel: NarrativeFrameworkLoadingScreenContainerViewModel,
  ) {}
  onNarrativeFrameworkInfoLoadedOrUpdated(
    narrativeFrameWorkTO: NarrativeFrameworkTO,
  ): void {
    // set narrative framework to open if it has not been shown before
    this.viewModel.isShowingContent.Value = !narrativeFrameWorkTO.shownBefore;
  }
}
