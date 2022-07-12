import { injectable } from "inversify";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import LearningWorldNamePanelController from "./LearningWorldNamePanelController";
import LearningWorldNamePanelPresenter from "./LearningWorldNamePanelPresenter";
import LearningWorldNamePanelViewModel from "./LearningWorldNamePanelViewModel";
import CoreDIContainer from "../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldPort from "../../../Ports/LearningWorldPort/ILearningWorldPort";

@injectable()
export default class LearningWorldNamePanelBuilder extends PresentationBuilder<
  LearningWorldNamePanelViewModel,
  LearningWorldNamePanelController,
  undefined,
  LearningWorldNamePanelPresenter
> {
  constructor() {
    super(
      LearningWorldNamePanelViewModel,
      LearningWorldNamePanelController,
      undefined,
      LearningWorldNamePanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(
      this.viewModel,
      this.controller,
      LearningWorldNamePanelViewModel
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerLearningWorldPanelPresenter(this.presenter!);
  }
}
