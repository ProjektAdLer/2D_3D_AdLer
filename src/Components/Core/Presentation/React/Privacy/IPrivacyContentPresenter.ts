import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default interface IPrivacyContentPresenter {
  onSettingsUpdated(newSettings: SettingsTO): void;
}
