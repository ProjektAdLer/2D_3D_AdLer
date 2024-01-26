// service identifiers used for dynamic DI bindings in presentation builders

const PRESENTATION_TYPES = {
  IBottomTooltipPresenter: Symbol("IBottomTooltipPresenter"),
  IExitModalPresenter: Symbol("IExitModalPresenter"),
  IStoryElementPresenter: Symbol("IStoryElementPresenter"),
  IMovementIndicator: Symbol("IMovementIndicator"),
  IHelpDeskModalPresenter: Symbol("IHelpDeskModalPresenter"),
  ILearningSpaceGoalPanelPresenter: Symbol("ILearningSpaceGoalPanelPresenter"),
  ILoadingScreenPresenter: Symbol("ILoadingScreenPresenter"),
  ICharacterAnimator: Symbol("ICharacterAnimator"),
  ICharacterNavigator: Symbol("ICharacterNavigator"),
  IAvatarCameraPresenter: Symbol("IAvatarCameraPresenter"),
};

export default PRESENTATION_TYPES;
