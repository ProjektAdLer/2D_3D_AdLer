import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import IWorldAdapter from "src/Components/Core/Application/Ports/WorldPort/IWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import IWorldSelectionController from "./IWorldSelectionController";
import IWorldSelectionPresenter from "./IWorldSelectionPresenter";
import WorldSelectionController from "./WorldSelectionController";
import WorldSelectionPresenter from "./WorldSelectionPresenter";
import WorldSelectionViewModel from "./WorldSelectionViewModel";

@injectable()
export default class WorldSelectionBuilder extends PresentationBuilder<
  WorldSelectionViewModel,
  IWorldSelectionController,
  undefined,
  IWorldSelectionPresenter
> {
  constructor() {
    super(
      WorldSelectionViewModel,
      WorldSelectionController,
      undefined,
      WorldSelectionPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<IWorldAdapter>>(
      PORT_TYPES.IWorldPort
    ).registerAdapter(this.presenter!);
  }
}
