import { injectable } from "inversify";
import ILearningRoomPort from "src/Components/Core/Ports/LearningRoomPort/ILearningRoomPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import IViewModelControllerProvider from "../../../ViewModelProvider/IViewModelControllerProvider";
import ScorePanelPresenter from "./ScorePanelPresenter";
import ScorePanelViewModel from "./ScorePanelViewModel";

@injectable()
export default class ScorePanelBuilder extends PresentationBuilder<
  ScorePanelViewModel,
  undefined,
  undefined,
  ScorePanelPresenter
> {
  constructor() {
    super(ScorePanelViewModel, undefined, undefined, ScorePanelPresenter);
  }

  override buildViewModel(): void {
    super.buildViewModel();
    CoreDIContainer.get<IViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerViewModelOnly(this.viewModel, ScorePanelViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<ILearningRoomPort>(
      PORT_TYPES.ILearningRoomPort
    ).registerScorePanelPresenter(this.presenter!);
  }
}
