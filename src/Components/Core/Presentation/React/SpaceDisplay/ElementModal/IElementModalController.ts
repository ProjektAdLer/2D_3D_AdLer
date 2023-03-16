export default interface IElementModalController {
  scoreElement(): Promise<void>;
  h5pEventCalled(event: any): Promise<void>;
}
