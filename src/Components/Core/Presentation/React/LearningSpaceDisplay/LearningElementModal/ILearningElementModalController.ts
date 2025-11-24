export default interface ILearningElementModalController {
  closeModal(): void;
  triggerOutroCutscene(): void;
  scoreLearningElement(): Promise<boolean>;
  h5pEventCalled(event: any): Promise<void>;
  showBottomToolTip(): void;
  setModalVisibility(isOpen: boolean): void;
  setCookieConsent(accepted: boolean): void;
}
