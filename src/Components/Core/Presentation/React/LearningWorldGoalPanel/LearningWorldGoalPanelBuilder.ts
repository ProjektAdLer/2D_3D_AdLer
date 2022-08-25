import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import LearningWorldGoalPanelController from "./LearningWorldGoalPanelController";
import LearningWorldGoalPanelPresenter from "./LearningWorldGoalPanelPresenter";
import LearningWorldGoalPanelViewModel from "./LearningWorldGoalPanelViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../Ports/LearningWorldPort/ILearningWorldPort";

@injectable()
export default class LearningWorldGoalPanelBuilder extends PresentationBuilder<
  LearningWorldGoalPanelViewModel,
  LearningWorldGoalPanelController,
  undefined,
  LearningWorldGoalPanelPresenter
> {
  constructor() {
    super(
      LearningWorldGoalPanelViewModel,
      LearningWorldGoalPanelController,
      undefined,
      LearningWorldGoalPanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      LearningWorldGoalPanelViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerLearningWorldGoalPanelPresenter(this.presenter!);
  }
}
