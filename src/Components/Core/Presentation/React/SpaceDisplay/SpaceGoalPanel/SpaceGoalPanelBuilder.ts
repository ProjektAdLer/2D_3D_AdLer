import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import SpaceGoalPanelController from "./SpaceGoalPanelController";
import SpaceGoalPanelPresenter from "./SpaceGoalPanelPresenter";
import SpaceGoalPanelViewModel from "./SpaceGoalPanelViewModel";
import CoreDIContainer from "../../../../DependencyInjection/CoreDIContainer";
import PORT_TYPES from "../../../../DependencyInjection/Ports/PORT_TYPES";
import IWorldPort from "src/Components/Core/Ports/WorldPort/IWorldPort";
import ISpaceGoalPanelPresenter from "./ISpaceGoalPanelPresenter";
import ISpaceGoalPanelController from "./ISpaceGoalPanelController";

@injectable()
export default class SpaceGoalPanelBuilder extends PresentationBuilder<
  SpaceGoalPanelViewModel,
  ISpaceGoalPanelController,
  undefined,
  ISpaceGoalPanelPresenter
> {
  constructor() {
    super(
      SpaceGoalPanelViewModel,
      SpaceGoalPanelController,
      undefined,
      SpaceGoalPanelPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<IWorldPort>(PORT_TYPES.IWorldPort).registerAdapter(
      this.presenter!
    );
  }
}
