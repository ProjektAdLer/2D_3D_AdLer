import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Ports/LearningWorldPort/ILearningWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import IRoomSelectionSectionController from "./IRoomSelectionSectionController";
import IRoomSelectionSectionPresenter from "./IRoomSelectionSectionPresenter";
import RoomSelectionSectionController from "./RoomSelectionSectionController";
import RoomSelectionSectionPresenter from "./RoomSelectionSectionPresenter";
import RoomSelectionSectionViewModel from "./RoomSelectionSectionViewModel";

@injectable()
export default class LearningRoomSelectionBuilder extends PresentationBuilder<
  RoomSelectionSectionViewModel,
  IRoomSelectionSectionController,
  undefined,
  IRoomSelectionSectionPresenter
> {
  constructor() {
    super(
      RoomSelectionSectionViewModel,
      RoomSelectionSectionController,
      undefined,
      RoomSelectionSectionPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter! as ILearningWorldAdapter);
  }
}
