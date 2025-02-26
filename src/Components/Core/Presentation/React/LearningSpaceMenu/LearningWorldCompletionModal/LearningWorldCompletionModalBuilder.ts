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
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import IGetLearningWorldUseCase from "src/Components/Core/Application/UseCases/GetLearningWorld/IGetLearningWorldUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";

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
      LearningWorldCompletionModalPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
      );

    CoreDIContainer.bind<ILearningWorldCompletionModalPresenter>(
      PRESENTATION_TYPES.ILearningWorldCompletionModalPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<AbstractPort<ILearningWorldAdapter>>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<IGetLearningWorldUseCase>(
      USECASE_TYPES.IGetLearningWorldUseCase,
    ).execute();
  }
}
