export default interface ILoadingScreenPresenter {
  showLoadingScreen(): void;
  releaseLoadingLock(): void;
  pushLoadStep(step: string): void;
}
