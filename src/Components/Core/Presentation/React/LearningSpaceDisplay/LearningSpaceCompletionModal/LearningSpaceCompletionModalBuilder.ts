import { injectable } from "inversify";
import LearningSpaceCompletionModalController from "./LearningSpaceCompletionModalController";
import LearningSpaceCompletionModalPresenter from "./LearningSpaceCompletionModalPresenter";
import ILearningSpaceCompletionModalController from "./ILearningSpaceCompletionModalController";
import ILearningSpaceCompletionModalPresenter from "./ILearningSpaceCompletionModalPresenter";
import LearningSpaceCompletionModalViewModel from "./LearningSpaceCompletionModalViewModel";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";

@injectable()
export default class LearningSpaceCompletionModalBuilder extends PresentationBuilder<
  LearningSpaceCompletionModalViewModel,
  ILearningSpaceCompletionModalController,
  undefined,
  ILearningSpaceCompletionModalPresenter
> {
  constructor() {
    super(
      LearningSpaceCompletionModalViewModel,
      LearningSpaceCompletionModalController,
      undefined,
      LearningSpaceCompletionModalPresenter
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort
    ).registerAdapter(this.presenter!);
  }
}
