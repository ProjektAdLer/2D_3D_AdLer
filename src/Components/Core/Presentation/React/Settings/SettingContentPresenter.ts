import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import ISettingContentPresenter from "./ISettingContentPresenter";
import SettingContentViewModel from "./SettingContentViewModel";

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
  }
}
