import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldNamePanelController from "./WorldNamePanelController";
import WorldNamePanelPresenter from "./WorldNamePanelPresenter";
import WorldNamePanelViewModel from "./WorldNamePanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import CORE_TYPES from "../../../../DependencyInjection/CoreTypes";
import ViewModelControllerProvider from "../../../ViewModelProvider/ViewModelControllerProvider";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "../../../../Ports/WorldPort/IWorldPort";

@injectable()
export default class WorldNamePanelBuilder extends PresentationBuilder<
  WorldNamePanelViewModel,
  WorldNamePanelController,
  undefined,
  WorldNamePanelPresenter
> {
  constructor() {
    super(
      WorldNamePanelViewModel,
      WorldNamePanelController,
      undefined,
      WorldNamePanelPresenter
    );
  }

  override buildController(): void {
    super.buildController();
    CoreDIContainer.get<ViewModelControllerProvider>(
      CORE_TYPES.IViewModelControllerProvider
    ).registerTupel(this.viewModel, this.controller, WorldNamePanelViewModel);
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IWorldPort>(
      PORT_TYPES.IWorldPort
    ).registerWorldNamePanelPresenter(this.presenter!);
  }
}
