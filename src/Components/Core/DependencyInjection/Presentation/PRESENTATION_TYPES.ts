// service identifiers used for dynamic DI bindings in presentation builders

const PRESENTATION_TYPES = {
  IBottomTooltipPresenter: Symbol("IBottomTooltipPresenter"),
  IExitModalPresenter: Symbol("IExitModalPresenter"),
  IStoryElementPresenter: Symbol("IStoryElementPresenter"),
  IStoryNPCPresenter: Symbol("IStoryNPCPresenter"),
  IMovementIndicator: Symbol("IMovementIndicator"),
  IHelpDeskModalPresenter: Symbol("IHelpDeskModalPresenter"),
  ILearningSpaceGoalPanelPresenter: Symbol("ILearningSpaceGoalPanelPresenter"),
  ILoadingScreenPresenter: Symbol("ILoadingScreenPresenter"),
  ICharacterAnimator: Symbol("ICharacterAnimator"),
  ICharacterNavigator: Symbol("ICharacterNavigator"),
  IAvatarCameraPresenter: Symbol("IAvatarCameraPresenter"),
  IControlsExplanationModalPresenter: Symbol(
    "IControlsExplanationModalPresenter",
  ),
  IAvatarFocusSelection: Symbol("IAvatarFocusSelection"),
  IAvatarPresenter: Symbol("IAvatarPresenter"),
  IBreakTimeNotificationOverviewPresenter: Symbol(
    "IBreakTimeNotificationOverviewPresenter",
  ),
  ILearningWorldCompletionModalPresenter: Symbol(
    "ILearningWorldCompletionModalPresenter",
  ),
  INarrativeFrameworkPresenter: Symbol("INarrativeFrameworkPresenter"),
  INarrativeFrameworkLoadingScreenContainerPresenter: Symbol(
    "INarrativeFrameworkLoadingScreenContainerPresenter",
  ),
  INarrativeFrameworkLearningSpaceContainerPresenter: Symbol(
    "INarrativeFrameworkLearningSpaceContainerPresenter",
  ),
  INarrativeFrameworkWorldCompletionModalContainerPresenter: Symbol(
    "INarrativeFrameworkWorldCompletionModalContainerPresenter",
  ),
  ICinemaStripesPresenter: Symbol("ICinemaStripesPresenter"),
  IExperiencePointsPanelPresenter: Symbol("IExperiencePointsPanelPresenter"),
  IProgressScorePanelPresenter: Symbol("IProgressScorePanelPresenter"),
  ILevelUpModalPresenter: Symbol("LevelUpModalPresenter"),
};

export default PRESENTATION_TYPES;
