import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import IPrivacyContentPresenter from "./IPrivacyContentPresenter";
import PrivacyContentViewModel from "./PrivacyContentViewModel";
import bind from "bind-decorator";

export default class PrivacyContentPresenter
  implements IPrivacyContentPresenter
{
  constructor(private viewModel: PrivacyContentViewModel) {}

  @bind
  onSettingsUpdated(newSettings: SettingsTO): void {
    if (newSettings.cookieConsent !== undefined) {
      this.viewModel.cookiesAccepted.Value =
        newSettings.cookieConsent === "accepted";
    }
  }
}
