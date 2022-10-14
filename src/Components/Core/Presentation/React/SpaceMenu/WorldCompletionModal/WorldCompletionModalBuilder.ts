import { injectable } from "inversify";
import WorldCompletionModalController from "./WorldCompletionModalController";
import WorldCompletionModalPresenter from "./WorldCompletionModalPresenter";
import IWorldCompletionModalController from "./IWorldCompletionModalController";
import IWorldCompletionModalPresenter from "./IWorldCompletionModalPresenter";
import WorldCompletionModalViewModel from "./WorldCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

@injectable()
export default class WorldCompletionModalBuilder extends PresentationBuilder<
  WorldCompletionModalViewModel,
  IWorldCompletionModalController,
  undefined,
  IWorldCompletionModalPresenter
> {
  constructor() {
    super(
      WorldCompletionModalViewModel,
      WorldCompletionModalController,
      undefined,
      WorldCompletionModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ISpaceAdapter>>(
      PORT_TYPES.ISpacePort
    ).registerAdapter(this.presenter!);
    CoreDIContainer.get<AbstractPort<IWorldAdapter>>(
      PORT_TYPES.IWorldPort
    ).registerAdapter(this.presenter!);
  }
}
