import { injectable } from "inversify";
import INarrativeFrameworkIntroPresenter from "./INarrativeFrameworkIntroPresenter";
import NarrativeFrameworkIntroViewModel from "./NarrativeFrameworkIntroViewModel";
import NarrativeFrameworkTO from "src/Components/Core/Application/DataTransferObjects/NarrativeFrameworkTO";
import bind from "bind-decorator";
import LearningSpaceTO from "src/Components/Core/Application/DataTransferObjects/LearningSpaceTO";

@injectable()
export default class NarrativeFrameworkIntroPresenter
  implements INarrativeFrameworkIntroPresenter
{
  constructor(private viewModel: NarrativeFrameworkIntroViewModel) {}
  onNarrativeFrameworkInfoLoadedOrUpdated(
    narrativeFrameWorkTO: NarrativeFrameworkTO,
  ): void {
    this.viewModel.isModal.Value = false;
    this.viewModel.introText = narrativeFrameWorkTO.introText;
    this.viewModel.theme = narrativeFrameWorkTO.theme;

    // set narrative framework to open if it has not been shown before
    this.viewModel.isOpenInLoadingscreen.Value =
      !narrativeFrameWorkTO.shownBefore;
  }

  @bind
  openModal(): void {
    console.log("openModal");
    this.viewModel.isModal.Value = true;
    this.viewModel.isOpenInModal.Value = true;
  }

  @bind
  closeNarrativeFrameworkIntro(): void {
    this.viewModel.isOpenInLoadingscreen.Value = false;
    this.viewModel.isOpenInModal.Value = false;
  }
}
