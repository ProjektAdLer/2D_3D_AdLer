import { injectable } from "inversify";
import LearningSpaceDetailPresenter from "./LearningSpaceDetailPresenter";
import ILearningSpaceDetailPresenter from "./ILearningSpaceDetailPresenter";
import LearningSpaceDetailViewModel from "./LearningSpaceDetailViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import LearningSpaceDetailController from "./LearningSpaceDetailController";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";

@injectable()
export default class LearningSpaceDetailBuilder extends PresentationBuilder<
  LearningSpaceDetailViewModel,
  LearningSpaceDetailController,
  undefined,
  ILearningSpaceDetailPresenter
> {
  constructor() {
    super(
      LearningSpaceDetailViewModel,
      LearningSpaceDetailController,
      undefined,
      LearningSpaceDetailPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter as ILearningWorldAdapter);
  }
}
