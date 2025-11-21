import { injectable } from "inversify";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import ILearningWorldSelectionController from "./ILearningWorldSelectionController";
import ILearningWorldSelectionPresenter from "./ILearningWorldSelectionPresenter";
import LearningWorldSelectionController from "./LearningWorldSelectionController";
import LearningWorldSelectionPresenter from "./LearningWorldSelectionPresenter";
import LearningWorldSelectionViewModel from "./LearningWorldSelectionViewModel";
import { LocationScope } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";

@injectable()
export default class LearningWorldSelectionBuilder extends PresentationBuilder<
  LearningWorldSelectionViewModel,
  ILearningWorldSelectionController,
  undefined,
  ILearningWorldSelectionPresenter
> {
  constructor() {
    super(
      LearningWorldSelectionViewModel,
      LearningWorldSelectionController,
      undefined,
      LearningWorldSelectionPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();
    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, LocationScope._global);
  }
}
