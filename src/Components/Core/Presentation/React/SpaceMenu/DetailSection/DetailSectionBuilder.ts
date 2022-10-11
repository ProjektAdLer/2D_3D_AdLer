import { injectable } from "inversify";
import DetailSectionPresenter from "./DetailSectionPresenter";
import IDetailSectionPresenter from "./IDetailSectionPresenter";
import DetailSectionViewModel from "./DetailSectionViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ISpaceAdapter from "src/Components/Core/Ports/SpacePort/ISpaceAdapter";
import DetailSectionController from "./DetailSectionController";
import IWorldAdapter from "src/Components/Core/Ports/WorldPort/IWorldAdapter";

@injectable()
export default class DetailSectionBuilder extends PresentationBuilder<
  DetailSectionViewModel,
  DetailSectionController,
  undefined,
  IDetailSectionPresenter
> {
  constructor() {
    super(
      DetailSectionViewModel,
      DetailSectionController,
      undefined,
      DetailSectionPresenter
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
