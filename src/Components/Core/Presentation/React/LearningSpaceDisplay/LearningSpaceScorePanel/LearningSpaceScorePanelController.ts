import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningSpaceGoalPanelPresenter from "../LearningSpaceGoalPanel/ILearningSpaceGoalPanelPresenter";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import bind from "bind-decorator";
import ILearningSpaceScorePanelController from "./ILearningSpaceScorePanelController";

export default class LearningSpaceScorePanelController
  implements ILearningSpaceScorePanelController
{
  private learningSpaceGoalPanelPresenter: ILearningSpaceGoalPanelPresenter;

  constructor() {}
  @bind
  panelClicked(): void {
    //pseudo lazy loading, due to timing issues ~fk
    //Both Score and Goal panel are called at the same time, but the Goal panel is not yet loaded
    this.learningSpaceGoalPanelPresenter === undefined &&
      (this.learningSpaceGoalPanelPresenter =
        CoreDIContainer.get<ILearningSpaceGoalPanelPresenter>(
          PRESENTATION_TYPES.ILearningSpaceGoalPanelPresenter
        ));
    this.learningSpaceGoalPanelPresenter.openOrCloseGoals();
  }
}
