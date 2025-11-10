import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default interface IPrivacyController {
  getUserSettings(): SettingsTO;
  setCookieConsent(accepted: boolean): void;
}
