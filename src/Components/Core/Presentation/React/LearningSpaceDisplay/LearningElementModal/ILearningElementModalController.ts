export default interface ILearningElementModalController {
  scoreLearningElement(): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
  xAPICompletedListener(t: any): void;
  showBottomToolTip(): void;
}
