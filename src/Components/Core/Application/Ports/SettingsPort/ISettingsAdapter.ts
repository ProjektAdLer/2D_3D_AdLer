import SettingsTO from "../../DataTransferObjects/SettingsTO";

export default interface ISettingsAdapter {
  onSettingsUpdated?(newSettings: SettingsTO): void;
}
