import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SpaceGoalPanelController from "./SpaceGoalPanelController";
import SpaceGoalPanelPresenter from "./SpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";

@injectable()
export default class SpaceGoalPanelBuilder extends PresentationBuilder<
  SpaceGoalPanelViewModel,
  SpaceGoalPanelController,
  undefined,
  SpaceGoalPanelPresenter
> {
  constructor() {
    super(
      SpaceGoalPanelViewModel,
      SpaceGoalPanelController,
      undefined,
      SpaceGoalPanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, SpaceGoalPanelViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ISpaceAdapter>>(
      PORT_TYPES.ISpacePort
    ).registerAdapter(this.presenter!);
  }
}
