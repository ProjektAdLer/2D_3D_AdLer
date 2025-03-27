import { injectable } from "inversify";
import INarrativeFrameworkIntroPresenter from "./INarrativeFrameworkIntroPresenter";
import NarrativeFrameworkIntroViewModel from "./NarrativeFrameworkIntroViewModel";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";

@injectable()
export default class NarrativeFrameworkIntroPresenter
  implements INarrativeFrameworkIntroPresenter
{
  constructor(private viewModel: NarrativeFrameworkIntroViewModel) {}
  onNarrativeFrameworkInfoLoadedOrUpdated(
    narrativeFrameWorkTO: NarrativeFrameworkTO,
  ): void {
    this.viewModel.introText = narrativeFrameWorkTO.introText;
    this.viewModel.outroText = narrativeFrameWorkTO.outroText;
    this.viewModel.theme = narrativeFrameWorkTO.theme;
  }
}
