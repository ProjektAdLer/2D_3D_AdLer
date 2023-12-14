export default interface ILoadingScreenPresenter {
  showLoadingScreen(): void;
  releaseLoadingLock(): void;
  lockLoadingLock(): void;
  pushLoadStep(step: string): void;
}
