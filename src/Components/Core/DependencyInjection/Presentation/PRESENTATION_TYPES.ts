// service identifiers used for dynamic DI bindings in presentation builders

const PRESENTATION_TYPES = {
  IBottomTooltipPresenter: Symbol("IBottomTooltipPresenter"),
  IExitModalPresenter: Symbol("IExitModalPresenter"),
  IIntroStoryElementPresenter: Symbol("IIntroStoryElementPresenter"),
  IMovementIndicator: Symbol("IMovementIndicator"),
  IHelpDeskModalPresenter: Symbol("IHelpDeskModalPresenter"),
  ILearningSpaceGoalPanelPresenter: Symbol("ILearningSpaceGoalPanelPresenter"),
  ILoadingScreenPresenter: Symbol("ILoadingScreenPresenter"),
};

export default PRESENTATION_TYPES;
