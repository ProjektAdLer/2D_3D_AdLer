import { injectable } from "inversify";
import LearningWorldCompletionModalController from "./LearningWorldCompletionModalController";
import LearningWorldCompletionModalPresenter from "./LearningWorldCompletionModalPresenter";
import ILearningWorldCompletionModalController from "./ILearningWorldCompletionModalController";
import ILearningWorldCompletionModalPresenter from "./ILearningWorldCompletionModalPresenter";
import LearningWorldCompletionModalViewModel from "./LearningWorldCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import AbstractPort from "src/Components/Core/Application/Ports/AbstractPort/AbstractPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import ILearningWorldAdapter from "src/Components/Core/Application/Ports/LearningWorldPort/ILearningWorldAdapter";
import { History } from "~ReactComponents/ReactRelated/ReactEntryPoint/History";

@injectable()
export default class LearningWorldCompletionModalBuilder extends PresentationBuilder<
  LearningWorldCompletionModalViewModel,
  ILearningWorldCompletionModalController,
  undefined,
  ILearningWorldCompletionModalPresenter
> {
  constructor() {
    super(
      LearningWorldCompletionModalViewModel,
      LearningWorldCompletionModalController,
      undefined,
      LearningWorldCompletionModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!, History.currentLocationScope());
  }
}
