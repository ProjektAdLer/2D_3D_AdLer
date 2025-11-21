import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import ISettingContentPresenter from "./ISettingContentPresenter";
import SettingContentViewModel from "./SettingContentViewModel";
import i18next from "i18next";

export default class SettingContentPresenter
  implements ISettingContentPresenter
{
  constructor(private viewModel: SettingContentViewModel) {}

  onSettingsUpdated(newSettings: SettingsTO): void {
    this.viewModel.breakTimeNotificationsEnabled.Value =
      newSettings.breakTimeNotificationsEnabled!;
    this.viewModel.highGraphicsQualityEnabled.Value =
      newSettings.highGraphicsQualityEnabled!;
    this.viewModel.language.Value = newSettings.language!;
    this.viewModel.volume.Value = newSettings.volume!;
    this.viewModel.graphicsQuality.Value = newSettings.graphicsQuality!;
    this.viewModel.lightsEnabled.Value = newSettings.lightsEnabled!;

    // Update i18next language when settings are loaded
    // Defer to avoid setState during render
    if (newSettings.language) {
      setTimeout(() => {
        i18next.changeLanguage(newSettings.language!);
      }, 0);
    }
  }
}
