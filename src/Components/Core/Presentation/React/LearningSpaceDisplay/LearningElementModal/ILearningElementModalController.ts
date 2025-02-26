export default interface ILearningElementModalController {
  closeModal(): void;
  triggerOutroCutscene(): void;
  scoreLearningElement(): Promise<boolean>;
  h5pEventCalled(event: any): Promise<void>;
  xAPICompletedListener(t: any): void;
  showBottomToolTip(): void;
}
