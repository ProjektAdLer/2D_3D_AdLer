import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";
import ICookieModalPresenter from "./ICookieModalPresenter";
import CookieModalViewModel from "./CookieModalViewModel";
import bind from "bind-decorator";

export default class CookieModalPresenter implements ICookieModalPresenter {
  constructor(private viewModel: CookieModalViewModel) {}

  @bind
  onSettingsUpdated(newSettings: SettingsTO): void {
    if (newSettings.cookieConsent !== undefined) {
      this.viewModel.cookieConsent.Value = newSettings.cookieConsent;
    }
  }
}
