import ISettingContentController from "./ISettingContentController";
import SettingContentViewModel from "./SettingContentViewModel";

export default class SettingContentController
  implements ISettingContentController
{
  constructor(private viewModel: SettingContentViewModel) {}

  onVolumeChange(newVolume: number): void {
    this.viewModel.changedSettings = true;
    this.viewModel.volume.Value = newVolume;
  }
  onGermanButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "de";
  }
  onEnglishButtonClicked(): void {
    this.viewModel.changedSettings = true;
    this.viewModel.language.Value = "en";
  }
  onGraphicsQualityChange(newQuality: string): void {
    this.viewModel.changedSettings = true;
    this.viewModel.graphicsQuality.Value = newQuality;
  }
}
