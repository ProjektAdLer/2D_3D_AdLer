import { injectable } from "inversify";
import PresentationBuilder from "src/Components/Core/Presentation/PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkLearningSpaceContainerViewModel from "./NarrativeFrameworkLearningSpaceContainerViewModel";
import INarrativeFrameworkLearningSpaceContainerController from "./INarrativeFrameworkLearningSpaceContainerController";
import INarrativeFrameworkLearningSpaceContainerPresenter from "./INarrativeFrameworkLearningSpaceContainerPresenter";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import NarrativeFrameworkLearningSpaceContainerController from "./NarrativeFrameworkLearningSpaceContainerController";
import NarrativeFrameworkLearningSpaceContainerPresenter from "./NarrativeFrameworkLearningSpaceContainerPresenter";

@injectable()
export default class NarrativeFrameworkLearningSpaceContainerBuilder extends PresentationBuilder<
  NarrativeFrameworkLearningSpaceContainerViewModel,
  INarrativeFrameworkLearningSpaceContainerController,
  undefined,
  INarrativeFrameworkLearningSpaceContainerPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkLearningSpaceContainerViewModel,
      NarrativeFrameworkLearningSpaceContainerController,
      undefined,
      NarrativeFrameworkLearningSpaceContainerPresenter,
    );

    console.log("builder");
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(
        PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
      )
    )
      CoreDIContainer.unbind(
        PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
      );

    CoreDIContainer.bind<INarrativeFrameworkLearningSpaceContainerPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkLearningSpaceContainerPresenter,
    ).toConstantValue(this.presenter!);

    CoreDIContainer.get<ILearningWorldPort>(
      PORT_TYPES.ILearningWorldPort,
    ).registerAdapter(this.presenter!, HistoryWrapper.currentLocationScope());
  }
}
