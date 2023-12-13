export default interface ILearningElementModalController {
  scoreLearningElement(): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
  showBottomToolTip(): void;
}
