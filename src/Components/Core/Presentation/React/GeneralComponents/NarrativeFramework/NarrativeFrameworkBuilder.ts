import { injectable } from "inversify";
import PresentationBuilder from "../../../PresentationBuilder/PresentationBuilder";
import NarrativeFrameworkViewModel from "./NarrativeFrameworkViewModel";
import INarrativeFrameworkController from "./INarrativeFrameworkController";
import INarrativeFrameworkPresenter from "./INarrativeFrameworkPresenter";
import NarrativeFrameworkController from "./NarrativeFrameworkController";
import NarrativeFrameworkPresenter from "./NarrativeFrameworkPresenter";
import CoreDIContainer from "~DependencyInjection/CoreDIContainer";
import ILearningWorldPort from "src/Components/Core/Application/Ports/Interfaces/ILearningWorldPort";
import PORT_TYPES from "~DependencyInjection/Ports/PORT_TYPES";
import { HistoryWrapper } from "~ReactComponents/ReactRelated/ReactEntryPoint/HistoryWrapper";
import IGetNarrativeFrameworkInfoUseCase from "src/Components/Core/Application/UseCases/GetNarrativeFrameworkInfo/IGetNarrativeFrameworkInfoUseCase";
import USECASE_TYPES from "~DependencyInjection/UseCases/USECASE_TYPES";
import PRESENTATION_TYPES from "~DependencyInjection/Presentation/PRESENTATION_TYPES";

@injectable()
export default class NarrativeFrameworkBuilder extends PresentationBuilder<
  NarrativeFrameworkViewModel,
  INarrativeFrameworkController,
  undefined,
  INarrativeFrameworkPresenter
> {
  constructor() {
    super(
      NarrativeFrameworkViewModel,
      NarrativeFrameworkController,
      undefined,
      NarrativeFrameworkPresenter,
    );
  }

  override buildPresenter(): void {
    super.buildPresenter();

    if (
      CoreDIContainer.isBound(PRESENTATION_TYPES.INarrativeFrameworkPresenter)
    )
      CoreDIContainer.unbind(PRESENTATION_TYPES.INarrativeFrameworkPresenter);

    CoreDIContainer.bind<INarrativeFrameworkPresenter>(
      PRESENTATION_TYPES.INarrativeFrameworkPresenter,
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
