export default interface IStoryElementController {
  closePanel(): void;
  increasePageId(): void;
  decreasePageId(): void;
  onIntroButtonClicked(): void;
  onOutroButtonClicked(): void;
  backToMenuButtonClicked(): void;
}
