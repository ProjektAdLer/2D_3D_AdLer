import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ISpaceSelectionController from "./ISpaceSelectionController";
import ISpaceSelectionPresenter from "./ISpaceSelectionPresenter";
import SpaceSelectionController from "./SpaceSelectionController";
import SpaceSelectionPresenter from "./SpaceSelectionPresenter";
import SpaceSelectionViewModel from "./SpaceSelectionViewModel";

@injectable()
export default class SpaceSelectionBuilder extends PresentationBuilder<
  SpaceSelectionViewModel,
  ISpaceSelectionController,
  undefined,
  ISpaceSelectionPresenter
> {
  constructor() {
    super(
      SpaceSelectionViewModel,
      SpaceSelectionController,
      undefined,
      SpaceSelectionPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<IWorldAdapter>>(
      PORT_TYPES.IWorldPort
    ).registerAdapter(this.presenter! as IWorldAdapter);

    CoreDIContainer.get<AbstractPort<ISpaceAdapter>>(
      PORT_TYPES.ISpacePort
    ).registerAdapter(this.presenter! as ISpaceAdapter);
  }
}
