import { injectable } from "inversify";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkLoadingScreenContainerViewModel from "./NarrativeFrameworkLoadingScreenContainerViewModel";
import INarrativeFrameworkLoadingScreenContainerController from "./INarrativeFrameworkLoadingScreenContainerController";
import INarrativeFrameworkLoadingScreenContainerPresenter from "./INarrativeFrameworkLoadingScreenContainerPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import NarrativeFrameworkLoadingScreenContainerController from "./NarrativeFrameworkLoadingScreenContainerController";
import NarrativeFrameworkLoadingScreenContainerPresenter from "./NarrativeFrameworkLoadingScreenContainerPresenter";

@injectable()
export default class NarrativeFrameworkLoadingScreenContainerBuilder extends PresentationBuilder<
  NarrativeFrameworkLoadingScreenContainerViewModel,
  INarrativeFrameworkLoadingScreenContainerController,
  undefined,
  INarrativeFrameworkLoadingScreenContainerPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkLoadingScreenContainerViewModel,
      NarrativeFrameworkLoadingScreenContainerController,
      undefined,
      NarrativeFrameworkLoadingScreenContainerPresenter,
    );

    console.log("builder");
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
      );

    CoreDIContainer.bind<INarrativeFrameworkLoadingScreenContainerPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkLoadingScreenContainerPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());

    CoreDIContainer.get<IGetNarrativeFrameworkInfoUseCase>(
      USECASE_TYPES.IGetNarrativeFrameworkInfoUseCase,
    ).execute();
  }
}
