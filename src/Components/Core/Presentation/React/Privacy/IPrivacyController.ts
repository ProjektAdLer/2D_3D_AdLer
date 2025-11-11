import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default interface IPrivacyController {
  getUserSettings(): void;
  setCookieConsent(accepted: boolean): void;
}
