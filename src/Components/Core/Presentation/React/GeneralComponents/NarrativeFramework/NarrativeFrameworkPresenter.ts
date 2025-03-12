import { injectable } from "inversify";
import INarrativeFrameworkPresenter from "./INarrativeFrameworkPresenter";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";

@injectable()
export default class NarrativeFrameworkPresenter
  implements INarrativeFrameworkPresenter
{
  constructor(private viewModel: NarrativeFrameworkViewModel) {}
  onNarrativeFrameworkInfoLoaded(
    narrativeFrameWorkTO: NarrativeFrameworkTO,
  ): void {
    this.viewModel.isOpen.Value = true;
    this.viewModel.introText = narrativeFrameWorkTO.introText;
    this.viewModel.outroText = narrativeFrameWorkTO.outroText;
  }
}
