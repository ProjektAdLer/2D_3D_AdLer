import { injectable } from "inversify";
import WorldDetailPresenter from "./WorldDetailPresenter";
import IWorldDetailPresenter from "./IWorldDetailPresenter";
import WorldDetailViewModel from "./WorldDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import WorldDetailController from "./WorldDetailController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class WorldDetailBuilder extends PresentationBuilder<
  WorldDetailViewModel,
  WorldDetailController,
  undefined,
  IWorldDetailPresenter
> {
  constructor() {
    super(
      WorldDetailViewModel,
      WorldDetailController,
      undefined,
      WorldDetailPresenter
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<IWorldAdapter>>(
      PORT_TYPES.IWorldPort
    ).registerAdapter(this.presenter!);
  }
}
