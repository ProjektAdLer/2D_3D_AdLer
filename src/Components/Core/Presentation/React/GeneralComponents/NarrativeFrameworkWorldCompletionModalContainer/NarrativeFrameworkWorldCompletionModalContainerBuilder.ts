import { injectable } from "inversify";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkWorldCompletionModalContainerViewModel from "./NarrativeFrameworkWorldCompletionModalContainerViewModel";
import INarrativeFrameworkWorldCompletionModalContainerController from "./INarrativeFrameworkWorldCompletionModalContainerController";
import INarrativeFrameworkWorldCompletionModalContainerPresenter from "./INarrativeFrameworkWorldCompletionModalContainerPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import NarrativeFrameworkWorldCompletionModalContainerController from "./NarrativeFrameworkWorldCompletionModalContainerController";
import NarrativeFrameworkWorldCompletionModalContainerPresenter from "./NarrativeFrameworkWorldCompletionModalContainerPresenter";

@injectable()
export default class NarrativeFrameworkWorldCompletionModalContainerBuilder extends PresentationBuilder<
  NarrativeFrameworkWorldCompletionModalContainerViewModel,
  INarrativeFrameworkWorldCompletionModalContainerController,
  undefined,
  INarrativeFrameworkWorldCompletionModalContainerPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkWorldCompletionModalContainerViewModel,
      NarrativeFrameworkWorldCompletionModalContainerController,
      undefined,
      NarrativeFrameworkWorldCompletionModalContainerPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
      );

    CoreDIContainer.bind<INarrativeFrameworkWorldCompletionModalContainerPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkWorldCompletionModalContainerPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<IGetNarrativeFrameworkInfoUseCase>(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).execute();
  }

  override buildViewModel(): void {
    super.buildViewModel();
  }
  override buildController(): void {
    super.buildController();
  }
}
