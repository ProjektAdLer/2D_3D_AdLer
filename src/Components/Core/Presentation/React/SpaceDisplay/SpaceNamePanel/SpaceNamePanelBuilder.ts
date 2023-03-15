import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SpaceNamePanelController from "./SpaceNamePanelController";
import SpaceNamePanelPresenter from "./SpaceNamePanelPresenter";
import SpaceNamePanelViewModel from "./SpaceNamePanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "src/Components/Core/Application/Ports/Interfaces/IWorldPort";
import ISpaceNamePanelController from "./ISpaceNamePanelController";
import ISpaceNamePanelPresenter from "./ISpaceNamePanelPresenter";

@injectable()
export default class WorldNamePanelBuilder extends PresentationBuilder<
  SpaceNamePanelViewModel,
  ISpaceNamePanelController,
  undefined,
  ISpaceNamePanelPresenter
> {
  constructor() {
    super(
      SpaceNamePanelViewModel,
      SpaceNamePanelController,
      undefined,
      SpaceNamePanelPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
