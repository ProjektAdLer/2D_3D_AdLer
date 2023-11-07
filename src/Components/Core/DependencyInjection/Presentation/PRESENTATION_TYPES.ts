// service identifiers used for dynamic DI bindings in presentation builders

const PRESENTATION_TYPES = {
  IBottomTooltipPresenter: Symbol("IBottomTooltipPresenter"),
  IExitModalPresenter: Symbol("IExitModalPresenter"),
  IMovementIndicator: Symbol("IMovementIndicator"),
  IHelpDeskModalPresenter: Symbol("IHelpDeskModalPresenter"),
  ILearningSpaceGoalPanelPresenter: Symbol("ILearningSpaceGoalPanelPresenter"),
};

export default PRESENTATION_TYPES;
