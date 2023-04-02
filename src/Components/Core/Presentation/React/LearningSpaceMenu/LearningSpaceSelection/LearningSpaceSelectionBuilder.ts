import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ILearningSpaceSelectionController from "./ILearningSpaceSelectionController";
import ILearningSpaceSelectionPresenter from "./ILearningSpaceSelectionPresenter";
import LearningSpaceSelectionController from "./LearningSpaceSelectionController";
import LearningSpaceSelectionPresenter from "./LearningSpaceSelectionPresenter";
import LearningSpaceSelectionViewModel from "./LearningSpaceSelectionViewModel";

@injectable()
export default class LearningSpaceSelectionBuilder extends PresentationBuilder<
  LearningSpaceSelectionViewModel,
  ILearningSpaceSelectionController,
  undefined,
  ILearningSpaceSelectionPresenter
> {
  constructor() {
    super(
      LearningSpaceSelectionViewModel,
      LearningSpaceSelectionController,
      undefined,
      LearningSpaceSelectionPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
