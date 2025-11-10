import SettingsTO from "src/Components/Core/Application/DataTransferObjects/SettingsTO";

export default interface ILearningElementModalController {
  closeModal(): void;
  triggerOutroCutscene(): void;
  scoreLearningElement(): Promise<boolean>;
  h5pEventCalled(event: any): Promise<void>;
  xAPICompletedListener(t: any): void;
  showBottomToolTip(): void;
  setModalVisibility(isOpen: boolean): void;
  getUserSettings(): SettingsTO;
  setUserSettings(settings: SettingsTO): void;
}
