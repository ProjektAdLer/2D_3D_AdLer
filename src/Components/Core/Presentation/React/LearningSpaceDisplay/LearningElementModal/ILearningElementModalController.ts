export default interface ILearningElementModalController {
  closeModal(): void;
  scoreLearningElement(): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
  xAPICompletedListener(t: any): void;
  showBottomToolTip(): void;
}
