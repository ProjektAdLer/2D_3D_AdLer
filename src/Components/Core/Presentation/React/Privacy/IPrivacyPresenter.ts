import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default interface IPrivacyPresenter {
  onSettingsUpdated(newSettings: SettingsTO): void;
}
