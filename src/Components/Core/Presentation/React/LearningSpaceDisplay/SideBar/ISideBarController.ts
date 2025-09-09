export default interface ISideBarController {
  onMainMenuButtonClicked(): void;
  onWorldMenuButtonClicked(): void;
  onSpaceMenuButtonClicked(): void;
  onControlsExplanationButtonClicked(): void;
  onBreakTimeButtonClicked(): void;
  onWorldCompletionModalButtonClicked(): void;
  onNarrativeFrameworkIntroButtonClicked(): void;
  onIntroStoryButtonClicked(): void;
  onOutroStoryButtonClicked(): void;
  onBadgeOverviewButtonClicked(): void;
  checkNarrativeFramework(): void;
  nextPage(): void;
  previousPage(): void;
}
