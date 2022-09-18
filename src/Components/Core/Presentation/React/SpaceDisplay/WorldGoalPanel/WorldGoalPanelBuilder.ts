import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldGoalPanelController from "./WorldGoalPanelController";
import WorldGoalPanelPresenter from "./WorldGoalPanelPresenter";
import WorldGoalPanelViewModel from "./WorldGoalPanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../Ports/WorldPort/IWorldPort";

@injectable()
export default class WorldGoalPanelBuilder extends PresentationBuilder<
  WorldGoalPanelViewModel,
  WorldGoalPanelController,
  undefined,
  WorldGoalPanelPresenter
> {
  constructor() {
    super(
      WorldGoalPanelViewModel,
      WorldGoalPanelController,
      undefined,
      WorldGoalPanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, WorldGoalPanelViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IWorldPort>(
      PORT_TYPES.IWorldPort
    ).registerWorldGoalPanelPresenter(this.presenter!);
  }
}
