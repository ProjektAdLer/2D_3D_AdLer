import { injectable } from "inversify";
import LearningWorldDetailPresenter from "./LearningWorldDetailPresenter";
import ILearningWorldDetailPresenter from "./ILearningWorldDetailPresenter";
import LearningWorldDetailViewModel from "./LearningWorldDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import LearningWorldDetailController from "./LearningWorldDetailController";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";

@injectable()
export default class LearningWorldDetailBuilder extends PresentationBuilder<
  LearningWorldDetailViewModel,
  LearningWorldDetailController,
  undefined,
  ILearningWorldDetailPresenter
> {
  constructor() {
    super(
      LearningWorldDetailViewModel,
      LearningWorldDetailController,
      undefined,
      LearningWorldDetailPresenter
    );
  }
  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
