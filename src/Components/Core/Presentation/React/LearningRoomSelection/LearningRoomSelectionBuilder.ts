import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Ports/LearningWorldPort/ILearningWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../PresentationBuilder/PresentationBuilder";
import ILearningRoomSelectionController from "./ILearningRoomSelectionController";
import ILearningRoomSelectionPresenter from "./ILearningRoomSelectionPresenter";
import LearningRoomSelectionController from "./LearningRoomSelectionController";
import LearningRoomSelectionPresenter from "./LearningRoomSelectionPresenter";
import LearningRoomSelectionViewModel from "./LearningRoomSelectionViewModel";

@injectable()
export default class LearningRoomSelectionBuilder extends PresentationBuilder<
  LearningRoomSelectionViewModel,
  ILearningRoomSelectionController,
  undefined,
  ILearningRoomSelectionPresenter
> {
  constructor() {
    super(
      LearningRoomSelectionViewModel,
      LearningRoomSelectionController,
      undefined,
      LearningRoomSelectionPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter! as ILearningWorldAdapter);
  }
}
