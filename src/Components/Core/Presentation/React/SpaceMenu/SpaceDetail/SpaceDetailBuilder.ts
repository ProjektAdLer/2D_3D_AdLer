import { injectable } from "inversify";
import SpaceDetailPresenter from "./SpaceDetailPresenter";
import ISpaceDetailPresenter from "./ISpaceDetailPresenter";
import SpaceDetailViewModel from "./SpaceDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import SpaceDetailController from "./SpaceDetailController";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

@injectable()
export default class SpaceDetailBuilder extends PresentationBuilder<
  SpaceDetailViewModel,
  SpaceDetailController,
  undefined,
  ISpaceDetailPresenter
> {
  constructor() {
    super(
      SpaceDetailViewModel,
      SpaceDetailController,
      undefined,
      SpaceDetailPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ISpaceAdapter>>(
      PORT_TYPES.ISpacePort
    ).registerAdapter(this.presenter as ISpaceAdapter);

    CoreDIContainer.get<AbstractPort<IWorldAdapter>>(
      PORT_TYPES.IWorldPort
    ).registerAdapter(this.presenter as IWorldAdapter);
  }
}
