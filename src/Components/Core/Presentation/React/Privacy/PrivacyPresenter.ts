import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import IPrivacyPresenter from "./IPrivacyPresenter";
import PrivacyViewModel from "./PrivacyViewModel";
import bind from "bind-decorator";

export default class PrivacyPresenter implements IPrivacyPresenter {
  constructor(private viewModel: PrivacyViewModel) {}

  @bind
  onSettingsUpdated(newSettings: SettingsTO): void {
    if (newSettings.cookieConsent !== undefined) {
      this.viewModel.cookiesAccepted.Value =
        newSettings.cookieConsent === "accepted";
    }
  }
}
